type MessageAuthor = "USER" | "BOT";

type ApiResponse<T = { [key: string]: T }> = {
  status: 'Success' | 'Error'
  message: string
  content: T
}

interface sessionState {
  data: {
    user?: User | null
    users?: User[] | null
    session?: Session | null
    message?: Message[] | null
  }
}

interface ErrorResponse {
  status: string,
  message: string
}

interface User {
  id?: string;
  name?: string;
  sessions?: Session[];
  createdAt?: Date;
}

interface Session {
  id?: string;
  user?: User;
  userId?: string;
  messages?: Message[];
  createdAt?: Date;
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