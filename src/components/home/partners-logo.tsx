import Image from "next/image";

import mazak from "@/assets/logos/mazak.svg";
import haas from "@/assets/logos/haas.png";
import hardinge from "@/assets/logos/hardinge.png";

function PartnerLogo() {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-around px-6 py-4 md:px-10 md:py-8">
      <Image className="h-5 w-fit md:h-10" src={mazak} alt="Yamazaki Mazak" />
      <Image className="h-5 w-fit md:h-10" src={haas} alt="Haas Automation" />
      <Image className="h-5 w-fit md:h-10" src={hardinge} alt="Hardinge" />
    </div>
  );
}

export { PartnerLogo };
