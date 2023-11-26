import { Box } from '@mui/material'

import MyMessage from './message/MyMessage'
import OtherMessage from './message/OtherMessage'
import { ChatHistory } from 'src/models/chat'
import { BOT } from './ChatHeader'

interface ChatContentProps {
  nickname: string
  chatDetails: ChatHistory[]
  isQuestionUser: boolean
  isLoading: boolean
  chatState: number
}

const ChatContent = ({ isQuestionUser, nickname, chatState, chatDetails, isLoading }: ChatContentProps) => {
  const isAI = chatState === 0
  return (
    <Box p={3}>
      {chatDetails?.map((chatDetail, index) => {
        if (isQuestionUser) {
          if (chatDetail.isQuestion) {
            return <MyMessage key={index} message={chatDetail.chat} sentAt={chatDetail.createdAt} />
          } else {
            return (
              <OtherMessage key={index} message={chatDetail.chat} sentAt={chatDetail.createdAt} nickname={nickname} />
            )
          }
        }
        if (chatDetail.isQuestion) {
          return (
            <OtherMessage key={index} message={chatDetail.chat} sentAt={chatDetail.createdAt} nickname={nickname} />
          )
        } else {
          return <MyMessage key={index} message={chatDetail.chat} sentAt={chatDetail.createdAt} />
        }
      })}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <OtherMessage
            message={isAI ? `${BOT}의 답변을 생성중입니다...` : '잠시만 기다려주세요'}
            nickname={nickname}
          />
        </Box>
      )}
    </Box>
  )
}

export default ChatContent
