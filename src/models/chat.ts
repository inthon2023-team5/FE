import { Grade } from './user'

export interface ChatInfo {
  qaId: number
  chat: string
  isQuestion: boolean
  questionId: number
}

export interface ChatHistory {
  id: number
  chat: string
  createdAt: string
  isQuestion: boolean
  questionId: number
}

export interface Profile {
  grade: Grade
  univId: string
  nickname: string
  rank: number
  top3: Array<number>
}

export interface ChatState {
  profile: Profile
  isQuestionUser: boolean
  chats: ChatHistory[]
  state: number
}
