import axios from 'axios';

export const generalInstance = axios.create({
  baseURL:
    typeof window !== 'undefined'
      ? '/api/v1'
      : 'https://cps.safarnameh24.com/api/v1',
});

generalInstance.interceptors.request.use(
  (config) => {
    // Django APPEND_SLASH requirement: Ensure request URL path ends with a trailing slash '/'
    if (config.url) {
      if (config.url.includes('?')) {
        const [path, query] = config.url.split('?');
        if (path && !path.endsWith('/')) {
          config.url = `${path}/?${query}`;
        }
      } else if (!config.url.endsWith('/')) {
        config.url = `${config.url}/`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

type ServiceHelper<T = any> = {
  type?: 'arr' | 'obj';
  data?: { data: T };
  status: 'error' | 'pending' | 'success';
};

export function isEmptyOrInvalid<T = any>(props: ServiceHelper<T>) {
  const { type = 'arr', data, status } = props;

  if (status === 'pending') return false;
  if (status === 'error') return true;

  if (type === 'arr') {
    return !data?.data || !Array.isArray(data.data) || data.data.length === 0;
  }

  if (type === 'obj') {
    return (
      !data?.data ||
      typeof data.data !== 'object' ||
      Object.keys(data.data).length === 0
    );
  }

  return true;
}
