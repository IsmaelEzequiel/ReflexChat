type MessageAuthor = "USER" | "BOT";

type ApiResponse<T = { [key: string]: T }> = {
  status: 'Success' | 'Error'
  message: string
  content: T
}

interface sessionState {
  data: {
    user?: User | null
    session?: Session | null
    message?: {
      userMessage: Message | null
      botMessage: Message | null
    } | null
  }
  loading: boolean
  error: ErrorResponse | null
}

interface ErrorResponse {
  status: string,
  message: string
}

interface User {
  id: string;
  name: string;
  sessions: Session[];
  createdAt: Date;
}

interface Session {
  id: string;
  user: User;
  userId: string;
  messages: Message[];
  createdAt: Date;
}

interface Message {
  id?: string;
  session?: Session;
  sessionId?: string;
  author: MessageAuthor;
  content: string;
  createdAt?: Date;
  optimisticUI?: boolean
}