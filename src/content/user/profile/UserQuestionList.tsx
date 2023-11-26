import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Card, List, Typography } from '@mui/material'
import QuestionButton from 'src/components/QuestionButton'
import { QuestionHistory } from 'src/models/question'

interface UserQuestionListProps {
  questions: QuestionHistory[]
  title: string
}

const UserQuestionList = ({ questions, title }: UserQuestionListProps) => {
  return (
    <Card>
      <Accordion sx={{ backgroundColor: 'transparent' }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h4" ml={2}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ margin: 0 }}>
          <List component="div">
            {questions.map((question, idx) => (
              <QuestionButton q={question} key={idx} />
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}

export default UserQuestionList
