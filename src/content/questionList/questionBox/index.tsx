import { Box, Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { QuestionPreview } from 'src/models/question'

interface QuestionBoxProps {
  question: QuestionPreview
}

const QuestionBox = ({ question }: QuestionBoxProps) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`chat/${question.id}`)
  }

  return (
    <Card
      sx={{ height: 150, width: '100%' }}
      onClick={handleNavigate}
      onMouseOver={() => {
        document.body.style.cursor = 'pointer'
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {question.nickname}
        </Typography>
        <Box sx={{ height: 70 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              mt: 1,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              height: 'fit-content'
            }}
          >
            {question.question}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }} textAlign={'right'}>
          {question.createdAt.split('T')[0]}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default QuestionBox
