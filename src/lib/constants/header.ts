import { routes } from '@/config/routes';

import { UsersRound, Hotel, Newspaper, Phone } from 'lucide-react';

// ------------------------------

export const content = {
  navbar: [
    {
      id: 'hosting',
      icon: Hotel,
      label: 'رزرو هتل',
      href: '',
    },
    {
      id: 'magazine',
      icon: Newspaper,
      label: 'مجله گردشگری',
      href: '',
    },
    {
      id: 'about-us',
      icon: UsersRound,
      label: 'درباره ما',
      href: routes.aboutUs,
    },
    {
      id: 'contact-us',
      icon: Phone,
      label: 'تماس با ما',
      href: routes.contactUs,
    },
  ],
};
