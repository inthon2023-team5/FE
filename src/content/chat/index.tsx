import { Helmet } from 'react-helmet-async'

import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatContent from './ChatContent'

import Scrollbar from 'src/components/Scrollbar'

import { Box, styled, Divider } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getQuestionChat } from 'src/api/chat'
import { useAuthHeader } from 'react-auth-kit'
import { ChatHistory, Profile } from 'src/models/chat'
import { enqueueSnackbar } from 'notistack'
import { Category } from 'src/data/category'

const ChatScreen = () => {
  const { category } = useParams()
  const qaId = Number(category)
  const token = useAuthHeader()()
  const navigate = useNavigate()
  const [chatDetails, setChatDetails] = useState<ChatHistory[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isQuestionUser, setIsQuestionUser] = useState(false)
  // if (!token) {
  //   navigate('auth/login')
  //   return null
  // }

  const handleFetchChatDetails = async () => {
    try {
      const res = await getQuestionChat(token, qaId)
      console.log(res)
      setChatDetails(res.chats)
      if (res.profile) {
        setProfile(res.profile)
      }
      setIsQuestionUser(res.isQuestionUser)
    } catch (error) {
      enqueueSnackbar('채팅 내역을 불러오는데 실패했어요. 나중에 다시 시도해 주세요', { variant: 'error' })
    }
  }

  useEffect(() => {
    if (!qaId) return
    handleFetchChatDetails()
  }, [qaId])

  return (
    <>
      <Helmet>
        <title>채팅</title>
      </Helmet>
      <RootWrapper className="Mui-FixedWrapper">
        <ChatWindow>
          {!!qaId && (
            <ChatTopBar sx={{ display: { xs: 'flex', lg: 'inline-block' } }}>
              <ChatHeader
                profile={profile}
                qaId={qaId}
                createdAt={chatDetails?.length !== 0 ? chatDetails[0].createdAt : ''}
              />
            </ChatTopBar>
          )}
          <Box flex={1}>
            <Scrollbar>
              <ChatContent
                isQuestionUser={isQuestionUser}
                nickname={profile?.nickname ?? 'BOT'}
                chatDetails={chatDetails}
              />
            </Scrollbar>
          </Box>
          <Divider />
          <ChatInput isQuestionUser={isQuestionUser} />
        </ChatWindow>
      </RootWrapper>
    </>
  )
}

export default ChatScreen

const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`
)

const ChatWindow = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
)

const ChatTopBar = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        padding: ${theme.spacing(2)};
        align-items: center;
`
)
