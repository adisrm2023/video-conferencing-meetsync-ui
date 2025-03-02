interface ChatMessageProps {
  message: {
    id: string
    sender: string
    content: string
    time: string
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isCurrentUser = message.sender === "You"

  return (
    <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium">{message.sender}</span>
        <span className="text-xs text-muted-foreground">{message.time}</span>
      </div>
      <div
        className={`mt-1 max-w-[85%] rounded-lg px-3 py-2 text-sm ${
          isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}

