import { Box } from '@mui/material'

import MyMessage from './message/MyMessage'
import OtherMessage from './message/OtherMessage'
import { ChatHistory } from 'src/models/chat'

interface ChatContentProps {
  nickname: string
  chatDetails: ChatHistory[]
  isQuestionUser: boolean
}

const ChatContent = ({ isQuestionUser, nickname, chatDetails }: ChatContentProps) => {
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
    </Box>
  )
}

export default ChatContent
