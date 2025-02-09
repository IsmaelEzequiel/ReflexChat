import { DateComponent } from "./date"

const ChatBox = ({ messages }: { messages?: Message[] }) => {
  return (
    <div className="space-y-4 w-full">
      {messages?.map((message: Message) => (
        message.author === 'BOT'
          ? (
            <div key={message.id} className="flex relative mb-6 w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
              {message.content}
              <DateComponent position="LEFT" createdAt={message.createdAt} />
            </div>
          ) : (
            <div key={message.id} className="flex relative mb-4 w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">
              {message.content}
              <DateComponent position="RIGHT" createdAt={message.createdAt} />
            </div>
          )
      ))}
    </div>
  )
}

export default ChatBox