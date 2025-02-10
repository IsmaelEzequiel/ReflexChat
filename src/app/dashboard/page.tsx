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

  const renderContent = () => {
    if (isEmptyData) {
      return (
        isEmptyData && (
          <div className="flex justify-center items-center h-full">
            <Image src="/assets/empty_data.svg" width="300" height="300" alt="No conversation selected" />
          </div>
        )
      )
    }

    if (isLoading) {
      return <LoadingComponent />
    }

    return (
      <ScrollArea className="relative p-5 mr-1 scroll-smooth h-full">
        <ChatBox messages={currentConversation?.content} />
      </ScrollArea>
    )
  }

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
          <div className="max-h-[90vh] flex-1 rounded-xl bg-muted/50">
            {renderContent()}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default withWrapper(DashboardPage)