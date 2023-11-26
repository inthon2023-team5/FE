import { Avatar, Box, Button, styled, InputBase, useTheme } from '@mui/material'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import stringToHexColor from 'src/utils/stringToColor'
import { useAuthHeader, useAuthUser } from 'react-auth-kit'
import { useState } from 'react'
import { Category } from 'src/data/category'
import { postQuestionNew } from 'src/api/question'
import { QuestionInfo } from 'src/models/question'
import { enqueueSnackbar } from 'notistack'
import { useNavigate, useParams } from 'react-router'
import { postQuestionChat } from 'src/api/chat'
import { ChatInfo } from 'src/models/chat'

const ChatInput = ({ isQuestionUser, handleRefresh }: { isQuestionUser: boolean; handleRefresh: () => void }) => {
  const theme = useTheme()
  const user = useAuthUser()()
  const token = useAuthHeader()()
  const navigate = useNavigate()

  const { category } = useParams()
  const qaId = Number(category)

  const [questionInfo, setQuestionInfo] = useState<QuestionInfo>({
    question: '',
    category: category?.toUpperCase() as Category
  })

  const [chatInfo, setChatInfo] = useState<ChatInfo>({
    qaId: qaId,
    chat: '',
    isQuestion: isQuestionUser,
    questionId: 0
  })

  const handleChangeChat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInfo({
      ...chatInfo,
      chat: event.target.value
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionInfo({
      ...questionInfo,
      question: event.target.value
    })
  }

  const handleSendMessage = async () => {
    try {
      await postQuestionChat(token, { ...chatInfo, qaId: qaId })
      setChatInfo({
        ...chatInfo,
        chat: ''
      })
      handleRefresh()
    } catch (error) {
      enqueueSnackbar('채팅이 전송되지 않았어요. 나중에 다시 시도해 주세요', { variant: 'error' })
    }
  }

  const handleCreateChatRoom = async () => {
    try {
      const res = await postQuestionNew(token, questionInfo)
      enqueueSnackbar('채팅방이 생성되었어요!', { variant: 'success' })
      navigate(`/chat/${res.id}`)
      handleRefresh()
    } catch (error) {
      enqueueSnackbar('서버에서 에러가 생겼어요. 나중에 다시 시도해 주세요', { variant: 'error' })
    }
  }

  return (
    <Box sx={{ background: theme.colors.alpha.white[50], display: 'flex', alignItems: 'center', p: 2 }}>
      <Box flexGrow={1} display="flex" alignItems="center">
        {user && <Avatar sx={{ bgcolor: stringToHexColor(user.nickname) }}>{user.nickname[0]}</Avatar>}{' '}
        <MessageInputWrapper
          autoFocus
          placeholder="질문을 입력해주세요"
          fullWidth
          value={qaId ? chatInfo.chat : questionInfo.question}
          onChange={qaId ? handleChangeChat : handleChange}
        />
        <Box>
          <Button
            startIcon={<SendTwoToneIcon />}
            variant="contained"
            sx={{ width: 150, height: 50 }}
            onClick={qaId ? handleSendMessage : handleCreateChatRoom}
          >
            {qaId ? '보내기' : '채팅방 생성'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatInput

const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(1)};
    width: 100%;
`
)
