import { QuestionHistories } from 'src/models/question'
import ApiManager from '.'

export const getUserQuestionHistory = async (token: string): Promise<QuestionHistories> => {
  const response = await ApiManager.get(`/user/qalist`, {
    headers: {
      Authorization: `${token}`
    }
  })
  return response.data
}
