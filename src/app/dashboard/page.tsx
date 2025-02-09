"use client"

import Image from "next/image"
import { useCallback, useMemo } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ChatBox from "@/components/ui/chat-box"
import LoadingComponent from "@/components/ui/loading"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { withWrapper } from "@/components/wrapper"
import { useGetAllUsersQuery, useSelectCurrentConversationMutation } from "@/lib/rtk-query/manageDashoard"

const DashboardPage = () => {
  const { data } = useGetAllUsersQuery(null)
  const [selectCurrentConversation, { data: currentConversation, isLoading }] = useSelectCurrentConversationMutation()
  
  const handleSelectChat = useCallback((id: string) => {
    selectCurrentConversation(id)
  }, [selectCurrentConversation])

  const isEmptyData = useMemo(() => {
    return (!currentConversation?.content || currentConversation?.content.length === 0) && !isLoading
  }, [currentConversation?.content, isLoading])

  return (
    <SidebarProvider>
      <AppSidebar
        users={data?.content}
        handleSelectChat={handleSelectChat}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="max-h-[68vh] flex-1 rounded-xl bg-muted/50">
            <ScrollArea className="relative p-5 mr-1 scroll-smooth h-full">
              {isEmptyData && (
                <div className="flex justify-center items-center h-full">
                  <Image src="/assets/empty_data.svg" width="300" height="300" alt="No conversation selected" />
                </div>
              )}
              <div className="min-h-[500px] w-full flex items-center justify-center">
                {isLoading ? <LoadingComponent /> : <ChatBox messages={currentConversation?.content} />}
              </div>
            </ScrollArea>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default withWrapper(DashboardPage)