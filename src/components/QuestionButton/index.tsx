import { Button, ListItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { QuestionHistory } from 'src/models/question'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { QuestionState } from 'src/data/questionState'

interface SidebarButtonProps {
  q: QuestionHistory
}

const QuestionButton = ({ q }: SidebarButtonProps) => {
  const { id, question, state } = q
  const navigate = useNavigate()

  return (
    <ListItem component="div">
      <Button
        disableRipple
        onClick={() => {
          navigate(`chat/${id}`)
        }}
        sx={{ display: 'flex', flexDirection: 'row' }}
        fullWidth
        endIcon={QuestionState[state] === 'Done' && <TaskAltIcon color="success" />}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 'bold',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            height: 'fit-content',
            width: '100%',
            textAlign: 'left'
          }}
        >
          {question}
        </Typography>
      </Button>
    </ListItem>
  )
}

export default QuestionButton
