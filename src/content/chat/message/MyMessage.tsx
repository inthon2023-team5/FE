import { Box, Typography, Card, styled } from '@mui/material'
import { formatChatTime } from 'src/utils/formatChatTime'

interface MyMessageProps {
  message: string
  sentAt: string
}

const MyMessage = ({ message, sentAt }: MyMessageProps) => {
  return (
    <Box display="flex" alignItems="flex-start" justifyContent="flex-end" py={3}>
      <Box display="flex" alignItems="flex-end" justifyContent="flex-end" mr={2}>
        <Typography variant="subtitle1" sx={{ pt: 1, mr: 1, display: 'flex', alignItems: 'center' }}>
          {formatChatTime(sentAt)}
        </Typography>
        <CardWrapperPrimary>{message}</CardWrapperPrimary>
      </Box>
    </Box>
  )
}

export default MyMessage

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
        background: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        padding: ${theme.spacing(2)};
        border-radius: ${theme.general.borderRadiusXl};
        border-top-right-radius: ${theme.general.borderRadius};
        max-width: 380px;
        display: inline-flex;
  `
)
