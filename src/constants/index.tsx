
import { MenuProps, PersonalProps, RoutesProps } from "@/types";

export const MENU: MenuProps[] = [
  {
    name: 'Home',
    slug: '/',
    icon: 'fas fa-home'
  },
  {
    name: 'Discovery',
    slug: '/discovery',
    icon: 'fas fa-compass'
  },
  {
    name: 'Explore',
    slug: '/explore',
    icon: 'fas fa-desktop'
  },
  {
    name: 'History',
    slug: '/history',
    icon: 'fas fa-history'
  },
  {
    name: 'Search',
    slug: '/search',
    icon: 'fas fa-search'
  },
];

export const PROXY = "https://ezexpress.tk/";

export const resizeImage = (url: string, width: string | number = "", height: string | number = "") =>
  url.startsWith("https://graph.facebook.com/")
    ? url
    : `${url}?imageView2/1/w/${width}/h/${height}/format/webp/interlace/1/ignore-error/1/q/90!/format/webp`;

export const subtitleProxy = (url: string) =>
  `${process.env.NEXT_PUBLIC_APP_SUBTITLE}?url=${encodeURIComponent(url)}`;

export const IMAGE_CARD_SIZE = {
  0: {
    width: 200,
    height: 100,
  },
  1: {
    width: 170,
    height: 240,
  },
};

// export const PERSONAL: PersonalProps[] = [
//   {
//     name: 'Sign In',
//     slug: `/sign-in?redirect=${encodeURIComponent(location.pathname)}`,
//     icon: 'fas fa-sign-in-alt'
//   }
// ]