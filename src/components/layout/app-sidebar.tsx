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

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroupLabel>Navigasi</SidebarGroupLabel>
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
