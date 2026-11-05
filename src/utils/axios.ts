import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL:
    typeof window !== 'undefined'
      ? '/api/v1'
      : 'https://cps.safarnameh24h24.com/api/v1',
  withCredentials: true,
});

// یک Promise مشترک برای جلوگیری از Refresh هم‌زمان
let refreshPromise: Promise<void> | null = null;

const refreshAccessToken = (): Promise<void> => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        '/api/v1/token/refresh/',
        {},
        {
          withCredentials: true,
        },
      )
      .then(() => {
        // بک‌اند توکن جدید را با Set-Cookie تنظیم می‌کند.
        // نیازی به خواندن response.data.access نیست.
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

// ارسال درخواست‌ها بدون خواندن یا ذخیره توکن در localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | RetryableRequest
      | undefined;

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // جلوگیری از حلقه بی‌نهایت
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest.url || '';

    // خود درخواست Refresh نباید دوباره Refresh شود.
    if (requestUrl.includes('/token/refresh/')) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshAccessToken();

      // مرورگر کوکی جدید را ارسال می‌کند.
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // درخواست اصلی را به حالت مهمان تبدیل نمی‌کنیم.
      // مخصوصاً درخواست رزرو نباید بدون احراز هویت تکرار شود.
      return Promise.reject(refreshError);
    }
  },
);