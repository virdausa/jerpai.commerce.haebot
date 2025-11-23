import {
  HomeIcon,
  // CirclePercentIcon,
  InfoIcon,
} from "lucide-react";

import lang from "@/lang/id/layout/navigation.lang";

const navigationData = [
  {
    title: lang.linkProducts,
    href: "/products",
    icon: HomeIcon,
  },
  // {
  //   title: lang.linkPromotions,
  //   href: "/promotions",
  //   icon: CirclePercentIcon,
  // },
  {
    title: lang.linkAbout,
    href: "https://haebot.com",
    icon: InfoIcon,
  },
];

export { navigationData };
