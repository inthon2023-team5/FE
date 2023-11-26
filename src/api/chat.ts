import { ChatInfo, ChatState } from 'src/models/chat'
import ApiManager from '.'

export const postQuestionChat = async (token: string, chatInfo: ChatInfo): Promise<void> => {
  console.log(chatInfo)
  await ApiManager.post(`/qa/chat`, chatInfo, {
    headers: {
      Authorization: `${token}`
    }
  })
}

export const getQuestionChat = async (token: string, qaId: number): Promise<ChatState> => {
  const response = await ApiManager.get(`/qa/chat/${qaId}`, {
    headers: {
      Authorization: `${token}`
    }
  })
  return response.data
}
