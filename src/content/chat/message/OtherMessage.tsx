import { Box, Typography, Card, styled, Avatar } from '@mui/material'
import { formatDistance } from 'date-fns'
import { formatChatTime } from 'src/utils/formatChatTime'
import stringToHexColor from 'src/utils/stringToColor'

interface MyMessageProps {
  message: string
  sentAt: string
  nickname: string
}

const OtherMessage = ({ message, sentAt, nickname }: MyMessageProps) => {
  return (
    <Box display="flex" alignItems="flex-start" justifyContent="flex-start" py={3}>
      <Avatar sx={{ bgColor: stringToHexColor(nickname) }}>{nickname[0]}</Avatar>
      <Box display="flex" alignItems="flex-base" justifyContent="flex-start" ml={2}>
        <CardWrapperSecondary sx={{ mb: 1 }}>{message}</CardWrapperSecondary>
        <Typography variant="subtitle1" sx={{ ml: 1, pt: 1, display: 'flex', alignItems: 'center' }}>
          {formatChatTime(sentAt)}
        </Typography>
      </Box>
    </Box>
  )
}

export default OtherMessage

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
)
