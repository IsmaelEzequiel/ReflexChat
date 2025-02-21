import React from "react";
import api from "@/config/api";
import ChatComponent from "@/components/pages/chatComponent";

type SessionPageProps = {
  params: Promise<{ sessionId: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getInitialMessages(sessionId: string) {
  try {
    const response = await api.get(`/api/message/${sessionId}`)

    return response.data.content
  } catch {
    return { error: true }
  }
}

const ChatPage = async ({ params }: SessionPageProps) => {
  const sessionId = (await params).sessionId
  const initialMessages = await getInitialMessages(sessionId)

  return <ChatComponent initialMessages={initialMessages} />
}

export default ChatPage