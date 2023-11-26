import { Box, Tooltip, Avatar, Typography, styled, Button, Chip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import stringToHexColor from 'src/utils/stringToColor'
import CustomDialog from 'src/components/CustomDialog'
import { useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import { postQuestionEnd, postQuestionEndAI, postQuestionJoin } from 'src/api/question'
import { useAuthHeader } from 'react-auth-kit'
import { Profile } from 'src/models/chat'
import { GradeSet } from 'src/models/user'
import { useNavigate } from 'react-router'
import RankBadge from '../user/profile/Rank'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
export const BOT = 'Agora Bot'

interface ChatHeaderProps {
  isQuestionUser: boolean
  profile: Profile | null
  qaId: number
  createdAt?: string
  handleRefresh?: () => void
  chatState: number
}

const ChatHeader = ({ isQuestionUser, profile, qaId, createdAt, chatState, handleRefresh }: ChatHeaderProps) => {
  const [isOpenDone, setIsOpenDone] = useState(false)
  const [isOpenChange, setIsOpenChange] = useState(false)
  const [isOpenAnswer, setIsOpenAnswer] = useState(false)

  const navigate = useNavigate()
  const token = useAuthHeader()()

  const handleOpenDone = () => {
    setIsOpenDone(prev => !prev)
  }

  const handleOpenAnswer = () => {
    setIsOpenAnswer(prev => !prev)
  }

  const handleOpenChange = () => {
    setIsOpenChange(prev => !prev)
  }

  const handleStartAnswering = async () => {
    try {
      await postQuestionJoin(token, qaId)
      enqueueSnackbar('답변을 시작합니다! 좋은 답변 부탁드려요:)', { variant: 'success' })
      handleRefresh()
      handleOpenAnswer()
    } catch {
      enqueueSnackbar('서버에서 에러가 생겼어요. 나중에 다시 시도해 주세요', { variant: 'error' })
    }
  }
  const handleClickDone = async () => {
    try {
      await postQuestionEnd(token, qaId)
      enqueueSnackbar('문제가 해결되었다니 다행이에요!', { variant: 'success' })
      handleOpenDone()
      navigate('/profile')
    } catch (error) {
      enqueueSnackbar('서버에서 에러가 생겼어요. 나중에 다시 시도해 주세요', { variant: 'error' })
      handleOpenDone()
    }
  }

  const handleClickChange = async () => {
    try {
      await postQuestionEndAI(token, qaId)
      handleOpenChange()
      handleRefresh()
    } catch (error) {
      enqueueSnackbar('서버에서 에러가 생겼어요. 나중에 다시 시도해 주세요', { variant: 'error' })
      handleOpenChange()
    }
  }

  return (
    <RootWrapper>
      <Box display="flex" alignItems="center">
        {chatState !== 1 && (
          <Avatar sx={{ bgcolor: stringToHexColor(profile?.nickname ?? BOT) }}>{profile?.nickname[0] ?? BOT[0]}</Avatar>
        )}
        {chatState === 1 && (
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            답변자를 기다리는 중입니다
          </Typography>
        )}
        {profile && (
          <Box width="auto" justifyContent={'center'}>
            <Box display={'flex'} justifyContent={'center'}>
              <RankBadge rank={profile.rank} />
            </Box>
          </Box>
        )}
        <Box>
          <Box display={'flex'} alignItems={'center'}>
            <Typography variant="h4">&nbsp;{profile?.nickname ?? BOT}</Typography>
            {profile && <Chip label={GradeSet[profile.grade]} sx={{ mx: 1 }} size="small" color="primary" />}{' '}
          </Box>
          {profile && profile.grade !== 'PROFESSOR' && (
            <Typography variant="subtitle1">{profile.univId.slice(0, 2)} 학번 </Typography>
          )}
        </Box>
      </Box>
      {isQuestionUser ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {createdAt && (
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              생성일: {createdAt.split('T')[0].replaceAll('-', '.')}
            </Typography>
          )}
          <Tooltip placement="bottom" title="문제가 해결되었어요">
            <Button
              startIcon={<CheckCircleIcon />}
              variant="outlined"
              color="success"
              onClick={handleOpenDone}
              sx={{ mr: 2 }}
            >
              <Typography variant="subtitle1">해결</Typography>
            </Button>
          </Tooltip>
          {chatState === 0 && (
            <Tooltip placement="bottom" title="사람을 연결해주세요">
              <Button startIcon={<RecordVoiceOverIcon />} variant="outlined" color="primary" onClick={handleOpenChange}>
                <Typography variant="subtitle1">전환</Typography>
              </Button>
            </Tooltip>
          )}
        </Box>
      ) : chatState !== 2 ? (
        <Tooltip placement="bottom" title="문제가 해결되었어요">
          <Button
            startIcon={<QuestionAnswerIcon />}
            variant="outlined"
            color="success"
            onClick={handleOpenAnswer}
            sx={{ mr: 2 }}
          >
            <Typography variant="subtitle1">답변하기</Typography>
          </Button>
        </Tooltip>
      ) : (
        <Typography variant={'h4'}>내가 답변중이에요</Typography>
      )}
      <CustomDialog
        text={'문제가 해결되었나요? 완료하시면 돌이킬 수 없으니 신중하게 선택해주세요!'}
        open={isOpenDone}
        onClose={handleOpenDone}
        onClickPrimary={handleClickDone}
        primaryText="완료"
        cancelText="취소"
      />
      <CustomDialog
        text={'선배들에게서 직접 답변을 받을 수 있는 기능이에요. 계속 하시겠어요?'}
        open={isOpenChange}
        onClose={handleOpenChange}
        onClickPrimary={handleClickChange}
        primaryText="전환"
        cancelText="취소"
      />
      <CustomDialog
        text={'학우님에게 직접 답변을 받을 수 있는 기능이에요. 계속 하시겠어요?'}
        open={isOpenAnswer}
        onClose={handleOpenAnswer}
        onClickPrimary={handleStartAnswering}
        primaryText="시작"
        cancelText="취소"
      />
    </RootWrapper>
  )
}

export default ChatHeader

const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
)
