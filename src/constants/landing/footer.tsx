import {
  ICInstagram,
  ICLinkdin,
  ICTelegram,
  ICWhatsApp,
} from '@/components/icons';

import { ICEmail, ICLocation, ICPhone } from '@/components/icons';

// ------------------------------

export const footer = {
  logo: '/image/logo/full-red-gray.png',
  title: 'Agency Safarname24 Hotel',
  desc: `        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
        صنعت چاپ و با استفاده از طراحان گرافیک است. لورم ایپسوم متن ساختگی با
        تولید سادگی نامفهوم از که است چاپگر متن ساختگی با تولید سادگی که از آن
        بابت میباشد.`,
  copyright: 'تمامی حقوق این وبسایت متعلق به زروان تریپ میباشد .',
  communicationWays: {
    phone: { icon: <ICPhone />, value: '0912 345 6789' },
    email: { icon: <ICEmail />, value: 'Safarname24@info.com' },
    address: {
      icon: <ICLocation />,
      value: 'تهران، جردن خیابان مطهری، رو به رو بانک پارسیان',
    },
  },
  identityBadges: [
    { url: '/image/logo/enamad.png', href: '' },
    { url: '/image/logo/neshane-meli.png', href: '' },
    { url: '/image/logo/enamad.png', href: '' },
  ],
  quickAccess: [
    { title: 'درباره ما', href: '/about-us' },
    { title: 'تماس با ما', href: '/contact-us' },
    { title: 'مجله گردشگری', href: '/weblog' },
    { title: 'بهترین هتل ها', href: '/hotel' },
    { title: 'قوانین و مقررات', href: '/rules' },
  ],
  socialMedias: [
    { icon: <ICLinkdin />, href: '' },
    { icon: <ICTelegram />, href: '' },
    { icon: <ICInstagram />, href: '' },
    { icon: <ICWhatsApp />, href: '' },
  ],
};
