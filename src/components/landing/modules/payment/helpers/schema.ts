import { z } from 'zod';

// =============================================================
// ۱. اعتبارسنجی رزروکننده (مشخصات رزروکننده اصلی الزامی است)
// =============================================================
const reserverSchema = z.object({
  first_name: z
    .string({ required_error: '* نام رزروکننده الزامی است' })
    .trim()
    .min(1, '* نام رزروکننده الزامی است'),
  last_name: z
    .string({ required_error: '* نام خانوادگی رزروکننده الزامی است' })
    .trim()
    .min(1, '* نام خانوادگی رزروکننده الزامی است'),
  national_code: z.string().optional().or(z.literal('')),
  phone_number: z
    .string({ required_error: '* شماره همراه رزروکننده الزامی است' })
    .trim()
    .min(1, '* شماره همراه رزروکننده الزامی است')
    .refine(
      (val) => {
        if (!val) return false;
        if (val.startsWith('0')) return val.length === 11 && /^09\d{9}$/.test(val);
        if (val.startsWith('9')) return val.length === 10 && /^9\d{9}$/.test(val);
        return false;
      },
      { message: '* شماره همراه نامعتبر است (مثال: 09123456789)' },
    ),
});

// =============================================================
// ۲. اعتبارسنجی مسافران (همگی اختیاری - بدون مسدود کردن فرم)
// =============================================================
const passengerSchema = z.object({
  first_name: z.string().optional().or(z.literal('')),
  last_name: z.string().optional().or(z.literal('')),
  national_code: z.string().optional().or(z.literal('')),
  phone_number: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(
      (val) => {
        // اگر خالی بود هیچ خطایی ندهد (کاملاً اختیاری)
        if (!val || val.trim() === '') return true;
        // فقط اگر پر شد، صحت ساختار چک شود
        if (val.startsWith('0')) return val.length === 11 && /^09\d{9}$/.test(val);
        if (val.startsWith('9')) return val.length === 10 && /^9\d{9}$/.test(val);
        return false;
      },
      { message: '* شماره همراه نامعتبر است (مثال: 09123456789)' },
    ),
});

// =============================================================
// ۳. اسکیما اصلی فرم
// =============================================================
export const formSchema = z.object({
  reserver: reserverSchema,
  rooms: z.array(
    z.object({
      id: z.union([z.string(), z.number()]),
      name: z.string(),
      capacity: z.number(),
      extra_capacity: z.number(),
      discount_on_purchase: z.number(),
      extra_capacity_price: z.number(),
      half_charges: z.object({
        enter: z.object({
          enabled: z.boolean(),
          price: z.number(),
        }),
        exit: z.object({
          enabled: z.boolean(),
          price: z.number(),
        }),
      }),
      passengers: z.object({
        // مسافر اصلی: تمام مشخصات اختیاری
        main_passenger: passengerSchema,
        // سایر مسافران: اختیاری
        other_passengers: z.array(
          passengerSchema.omit({ phone_number: true }),
        ),
        // مسافران اضافه: اختیاری
        extra_capacity_passengers: z.array(
          passengerSchema.omit({ phone_number: true }),
        ),
      }),
    }),
  ),
});

// تایپ TypeScript استخراج‌شده از اسکیما (جهت استفاده در کامپوننت‌ها)
export type FormSchemaType = z.infer<typeof formSchema>;