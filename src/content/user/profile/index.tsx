import { Helmet } from 'react-helmet-async'
import Footer from 'src/components/Footer'

import { Grid, Container } from '@mui/material'

import ProfileBox from './ProfileBox'
import { useAuthUser, useAuthHeader } from 'react-auth-kit'
import { useNavigate } from 'react-router'
import UserQuestionList from './UserQuestionList'
import { getUserQuestionHistory } from 'src/api/user'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { QuestionHistory } from 'src/models/question'

const UserProfile = () => {
  const token = useAuthHeader()()
  const authUser = useAuthUser()
  const user = authUser()
  const navigate = useNavigate()

  if (!user) navigate('auth/login')

  const [questionHistoryAnswer, setQuestionHistoryAnswer] = useState<QuestionHistory[]>([])
  const [questionHistoryQuestion, setQuestionHistoryQuestion] = useState<QuestionHistory[]>([])

  const fetchQuestionHistory = async () => {
    try {
      const res = await getUserQuestionHistory(token)

      setQuestionHistoryAnswer(res.questions.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)))
      setQuestionHistoryQuestion(res.answers.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)))
    } catch (err) {
      enqueueSnackbar('질문 내역을 불러오는데 실패했습니다.', { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchQuestionHistory()
  }, [])

  return (
    <>
      <Helmet>
        <title>내 프로필</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <ProfileBox />
          </Grid>
          <Grid item xs={12}>
            <UserQuestionList questions={questionHistoryQuestion} title={'내가 질문한 내역'} />
          </Grid>
          <Grid item xs={12}>
            <UserQuestionList questions={questionHistoryAnswer} title={'내가 답변한 내역'} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default UserProfile
