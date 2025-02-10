import { ComponentProps } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

interface AppSidebarProps {
  users?: User[];
  handleSelectChat: (id: string) => void
}

export function AppSidebar({ users, handleSelectChat, ...props }: ComponentProps<typeof Sidebar> & AppSidebarProps) {
  const { isTablet, toggleSidebar } = useSidebar()

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>List of users</SidebarGroupLabel>

          {users?.map((item) => (
            <SidebarGroup key={item.name}>
              <SidebarGroupLabel>{item.name}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.sessions.map((item, index) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild isActive={false}>
                        <Button
                          variant="link"
                          className="justify-start"
                          onClick={() => {
                            handleSelectChat(item.id)
                            if (isTablet) {
                              toggleSidebar()
                            }
                          }}
                        >
                          Chat #{index + 1}
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
