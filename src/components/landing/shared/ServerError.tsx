import Image from 'next/image';

// ------------------------------

export function ServerError() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-screen-template flex-col items-center justify-center px-5">
      <Image
        width={1000}
        height={440}
        alt="servererror"
        src={'/image/logo/server-error.png'}
        className="mb-8 w-full max-w-[40rem] object-contain"
      />

      <p className="text-lg font-bold lg:text-xl">خطایی رخ داده است !</p>

      <p className="mb-6 mt-2 text-cs85 font-semibold text-zinc-600 lg:text-cs09">
        متاسفانه مشکلی در سرور سفرنامه 24 بوجود آمده است
      </p>

      <button
        onClick={() => window.location.reload()}
        className="rounded-full border-2 border-zinc-800 px-6 py-2.5 text-cs85 font-semibold text-zinc-800"
      >
        تلاش مجدد
      </button>
    </main>
  );
}
