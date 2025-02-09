"use client"

import { withWrapper } from "@/components/wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDown, Send } from "lucide-react";
import { useRef, useState } from "react";

const Home = () => {
  const [showScrollDownArrow, setShowScrollDownArrow] = useState(false)
  const containerScrollRef = useRef<HTMLDivElement | null>(null)

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

  const handleFormSubmit = () => {

  }

  return (
    <div className="flex items-center justify-center h-svh">
      <div className="flex rounded-xl bg-card text-card-foreground shadow-2xl w-full max-w-[900px] h-[90%] justify-end flex-col overflow-hidden">
        <ScrollArea onScrollCapture={handleScroll} ref={containerScrollRef} className="relative p-5 mr-1 scroll-smooth">
          <div className="space-y-4">
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">Hi, how can I help you today?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">What seems to be the problem?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">Hi, how can I help you today?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">What seems to be the problem?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">Hi, how can I help you today?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">What seems to be the problem?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">Hi, how can I help you today?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">What seems to be the problem?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">Hi, how can I help you today?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">What seems to be the problem?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">Hi, how can I help you today?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">What seems to be the problem?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">Hi, how can I help you today?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">What seems to be the problem?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">Hi, how can I help you today?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">What seems to be the problem?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I can't log in.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">Hi, how can I help you today?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <div className="flex relative mb-6 w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
              What seems to be the problem?
              <span className="absolute -bottom-6 left-1 text-[#8d948d] text-xs">06:10 PM</span>
            </div>
            <div className="flex relative mb-6 w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">
              I can't log in.
              <span className="absolute -bottom-6 right-1 text-[#8d948d] text-xs">06:10 PM</span>
            </div>
          </div>
          <div
            onClick={handleScrollDownButton}
            className={`${showScrollDownArrow ? 'opacity-1' : 'opacity-0'} absolute transition-opacity bottom-6 left-1/2 transform -translate-x-1/2 rounded-full p-1 dark:bg-background bg-neutral-200 cursor-pointer`}
          >
            <ArrowDown className="w-5 h-5" />
            <span className="sr-only">Scroll down</span>
          </div>
        </ScrollArea>
        <div className="flex items-center p-5 pt-0">
          <form onSubmit={handleFormSubmit} className="flex w-full items-center space-x-2">
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1"
              id="message"
              placeholder="Type your message..."
              autoComplete="off"
            />
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
              type="submit"
            >
              <Send />
              <span className="sr-only">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withWrapper(Home)