import { Category } from 'src/data/category'

export interface QuestionPreview {
  id: string
  question: string
  nickname: string
  createdAt: string
}

export interface QuestionHistory {
  id: number
  createdAt: string
  category: Category
  question: string
  state: number
}

export interface QuestionHistories {
  questions: QuestionHistory[]
  answers: QuestionHistory[]
}

export interface QuestionInfo {
  question: string
  category: Category
}
