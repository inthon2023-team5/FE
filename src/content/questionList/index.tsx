import { Helmet } from 'react-helmet-async'
import PageTitle from 'src/components/PageTitle'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import { Box, Container, Grid, Typography } from '@mui/material'
import Footer from 'src/components/Footer'
import QuestionBox from './questionBox'
import { useEffect, useState } from 'react'
import { QuestionPreview } from 'src/models/question'
import { getQuestions } from 'src/api/question'
import { useLocation } from 'react-router'
import { Category, CategorySet } from 'src/data/category'
import { enqueueSnackbar } from 'notistack'

const QuestionList = () => {
  const [questions, setQuestions] = useState<QuestionPreview[]>([])
  const category = useLocation().pathname.split('/')[1] as Category

  const fetchQuestions = async () => {
    try {
      const res = await getQuestions(category ?? '')
      setQuestions(res)
    } catch (e) {
      enqueueSnackbar('질문 목록을 불러오는데 실패했습니다.', { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [category])

  return (
    <>
      <Helmet>
        <title>{category} 게시판</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading={`${category.length ? CategorySet[category.toUpperCase()] : '전체'} 게시판`}
          subHeading="원하는 질문을 입력해보세요"
          buttonTitle={category ? `${CategorySet[category.toUpperCase()]} 질문 추가하기` : ''}
          buttonLink={category ? `/chat/${category}` : null}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        {questions.length ? (
          <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
            {questions.map((question, idx) => (
              <Grid item xs={12} md={4} lg={3} key={idx}>
                <QuestionBox question={question} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 3 }}>
              질문이 없습니다.
            </Typography>
          </Box>
        )}
      </Container>
      <Footer />
    </>
  )
}

export default QuestionList
