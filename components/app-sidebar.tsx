"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Croissant,
  Coffee,
  CakeSlice,
  ChartNoAxesCombined,
  IdCardLanyard,
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Productos",
      url: "/admin/productos",
      icon: <Coffee />,
    },
    {
      title: "Categorias",
      url: "/admin/categorias",
      icon: <CakeSlice />,
    },
    {
      title: "Reportes",
      url: "/reportes",
      icon: <ChartNoAxesCombined />,
    },
    {
      title: "Empleados",
      url: "/admin/empleados",
      icon: <IdCardLanyard />,
    }, 
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/pos" />}
            >
              <Croissant className="size-5!" />
              <span className="text-base font-semibold">Cafetería KFE</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}