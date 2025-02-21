import React from "react";
import api from "@/config/api";
import ChatComponent from "@/components/pages/chatComponent";

async function getInitialMessages(context: { params: { sessionId: string } }) {
  try {
    const { sessionId } = (await context.params) || {}
    const response = await api.get(`/api/message/${sessionId}`)

    return response.data.content
  } catch {
    return { error: true }
  }
}

const ChatPage = async (context: { params: { sessionId: string } }) => {
  const initialMessages = await getInitialMessages(context)

  return <ChatComponent initialMessages={initialMessages} />
}

export default ChatPage