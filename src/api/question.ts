import { Category } from 'src/data/category'
import ApiManager from '.'
import { QuestionInfo, QuestionPreview } from 'src/models/question'

export const getQuestions = async (category: Category): Promise<QuestionPreview[]> => {
  if (category === '') {
    const response = await ApiManager.get('/qa/list')
    return response.data
  }
  const response = await ApiManager.get(`/qa/list/${category.toUpperCase()}`)
  return response.data
}

export const postQuestionNew = async (token: string, questionInfo: QuestionInfo): Promise<{ id: number }> => {
  const res = await ApiManager.post('/qa/new', questionInfo, {
    headers: {
      Authorization: `${token}`
    }
  })
  return res.data
}

export const postQuestionJoin = async (token: string, questionId: number): Promise<void> => {
  await ApiManager.post(
    `/qa/join`,
    { qaId: questionId },
    {
      headers: {
        Authorization: `${token}`
      }
    }
  )
}

export const postQuestionEndAI = async (token: string, questionId: number): Promise<void> => {
  await ApiManager.post(
    `/qa/endAI`,
    { qaId: questionId },
    {
      headers: {
        Authorization: `${token}`
      }
    }
  )
}

export const postQuestionEnd = async (token: string, questionId: number): Promise<void> => {
  await ApiManager.post(
    `/qa/end`,
    { qaId: questionId },
    {
      headers: {
        Authorization: `${token}`
      }
    }
  )
}
