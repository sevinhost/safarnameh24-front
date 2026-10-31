import '@/theme/globals.css';

import { Providers } from '@/providers';
import { metadataConfig } from '@/config/metadata/global';
import { inter_font, hezargan_font, iransans_font } from '@/theme/font';

export const metadata = metadataConfig;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${iransans_font.variable} ${hezargan_font.variable} ${inter_font.variable} ss01 antialiased`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
