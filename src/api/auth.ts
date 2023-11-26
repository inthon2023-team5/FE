import { LoginUser, RegisterUser } from 'src/models/user'
import ApiManager from '.'

export const postLogin = async (loginInfo: LoginUser) => {
  const response = await ApiManager.post('/auth/login', loginInfo)
  return response.data
}

export const postRegister = async (registerInfo: RegisterUser) => {
  const response = await ApiManager.post('/auth/signup', registerInfo)
  return response.data
}

export const postNicknameTest = async (nickname: string) => {
  const response = await ApiManager.post('/auth/checkNickname', { nickname })
  return response.data
}
