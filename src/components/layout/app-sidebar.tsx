import navLang from "@/lang/id/layout/navigation.lang";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navigationData } from "@/data/navigation.data";
import Link from "next/link";
import Image from "next/image";
import haebot from "@/assets/logos/haebot.png";

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <Image src={haebot} alt="Haebot" className="h-8 w-fit md:h-10" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel>{navLang.navigationLabel}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigationData.map((item) => (
              <SidebarMenuItem key={`sidebar-nav-${item.title}`}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.icon className="size-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export { AppSidebar };
