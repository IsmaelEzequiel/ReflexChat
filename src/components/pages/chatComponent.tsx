"use client"

import React, { useEffect, useRef, useState } from "react";
import { withWrapper } from "@/components/wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDown, LoaderCircle, Send } from "lucide-react";
import { useFetchCreateMessagePostMutation } from "@/lib/rtk-query/manageSession";
import { useRouter } from "next/navigation";
import ChatBox from "@/components/ui/chat-box";
import { toast } from "@/hooks/use-toast";

const ChatComponent = ({ initialMessages }: { initialMessages: { session: Session, error: boolean } }) => {
  const router = useRouter()
  const [showScrollDownArrow, setShowScrollDownArrow] = useState<boolean>(false)
  const containerScrollRef = useRef<HTMLDivElement | null>(null)
  const [messages, setMessages] = useState<Message[]>(initialMessages?.session?.messages || [])
  const [fetchCreateMessagePost, { data: messageData, isLoading: loadingMessage }] = useFetchCreateMessagePostMutation()

  useEffect(() => {
    if (initialMessages.error) {
      router.push('/')

      toast({
        title: "Oops! Something went wrong.",
        variant: "destructive",
        description: "Session not found",
      })
    }
  }, [initialMessages.error, router])

  useEffect(() => handleScrollDownButton(), [messages])

  useEffect(() => {
    if (messageData?.content && messageData.status === 'Success') {
      setMessages((prevState) => {
        const findUserResponse = messageData?.content.find((response) => response.author === 'USER')
        const botMessages = messageData?.content.filter((message) => message.author === "BOT");

        const updatedPrevState = prevState.map((state) => {
          return state.optimisticUI && findUserResponse ? findUserResponse : state
        })

        return [...updatedPrevState, ...botMessages]
      })
    }

    // generated div from ScrollArea has table who break on responsive
    const tableContainer = containerScrollRef.current?.children[1]?.firstChild as HTMLElement

    if (tableContainer) {
      tableContainer.style.display = 'block'
    }
  }, [containerScrollRef, messageData])

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const container = event.target as HTMLDivElement;
    const hideArrow = container.scrollTop + container.clientHeight >= container.scrollHeight - 50
    setShowScrollDownArrow(!hideArrow) 
  };

  const handleScrollDownButton = () => {
    const container = containerScrollRef.current?.children[1]
    const childContainer = container?.firstElementChild

    if (container) {
      container.scrollTo({ top: childContainer?.clientHeight, behavior: 'smooth' })
    }
  }

  const formAction = async (formData: FormData) => {
    const message = formData.get("message");

    const optimisticMessage = {
      id: `${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`,
      content: message as string,
      author: "USER" as MessageAuthor,
      session: {
        user: {
          name: initialMessages.session?.user?.name
        }
      },
      optimisticUI: true
    };

    setMessages([...messages, optimisticMessage])

    fetchCreateMessagePost({
      content: message as string,
      createdAt: new Date(),
      sessionId: initialMessages.session.id as string,
    });
  }

  return (
    <div className="flex items-center justify-center h-svh">
      <div className="flex rounded-xl bg-card text-card-foreground shadow-2xl w-full max-w-[900px] h-[90%] justify-end flex-col overflow-hidden mx-2 lg:mx-0">
        <>
          <ScrollArea onScrollCapture={handleScroll} ref={containerScrollRef} className="relative p-5 mr-1 scroll-smooth h-full">
            <ChatBox messages={messages} user={initialMessages.session?.user} />
            <div
              onClick={handleScrollDownButton}
              className={`${showScrollDownArrow ? 'opacity-100' : 'opacity-0'} absolute transition-opacity bottom-6 left-1/2 transform -translate-x-1/2 rounded-full p-1 dark:bg-background bg-neutral-200 cursor-pointer`}
            >
              <ArrowDown className="w-5 h-5" />
              <span className="sr-only">Scroll down</span>
            </div>
          </ScrollArea>
          <div className="flex items-center p-5 pt-0">
            <form action={formAction} className="flex w-full items-center space-x-2">
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1"
                id="message"
                name="message"
                placeholder="Type your message..."
                autoComplete="off"
                required
                readOnly={loadingMessage}
              />
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
                type="submit"
                disabled={loadingMessage}
              >
                <div className={`flex items-center justify-center [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${loadingMessage && 'animate-spin'}`}>
                  <Send className={`scale-100 transition-all ${loadingMessage ? '!scale-0' : ''}`} />
                  <LoaderCircle className={`absolute scale-0 opacity-0 transition-all ${loadingMessage ? '!scale-100 !opacity-100' : '' }`} />
                </div>
                <span className="sr-only">Send</span>
              </button>
            </form>
          </div>
        </>
      </div>
    </div>
  );
}

export default withWrapper(ChatComponent)