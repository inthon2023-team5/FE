export type Grade = 'JUNIOR' | 'SENIOR' | 'PROFESSOR'

export const GradeSet = {
  JUNIOR: '후배',
  SENIOR: '선배',
  PROFESSOR: '교수'
}

export interface RegisterUser {
  univId: string
  name: string
  nickname: string
  email: string
  password: string
  confirmPassword?: string
  grade: Grade
  rank: number
}

export interface LoginUser {
  univId: string
  password: string
}

export const BadgeSet = [
  'BRONZE 3',
  'BRONZE 2',
  'BRONZE 1',
  'SILVER 3',
  'SILVER 2',
  'SILVER 1',
  'GOLD 3',
  'GOLD 2',
  'GOLD 1',
  'PLATINUM 3',
  'PLATINUM 2',
  'PLATINUM 1',
  'DIAMOND 3',
  'DIAMOND 2',
  'DIAMOND 1'
]
