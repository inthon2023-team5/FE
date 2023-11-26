import { Helmet } from 'react-helmet-async'
import { useState } from 'react'

import { Container, Card, TextField, Link, styled } from '@mui/material'
import Footer from 'src/components/Footer'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { postLogin } from 'src/api/auth'
import { LoginUser } from 'src/models/user'
import { useSnackbar } from 'notistack'
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from 'react-router'

const LoginScreen = () => {
  const [loginInfo, setLoginInfo] = useState<LoginUser>({
    univId: '',
    password: ''
  })

  const signIn = useSignIn()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginInfo({
      ...loginInfo,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loginInfo.univId.length === 0 || loginInfo.password.length === 0) {
      enqueueSnackbar('학번과 비밀번호를 입력해주세요.', { variant: 'warning' })
      return
    }
    try {
      const res = await postLogin(loginInfo)
      const authData = {
        token: res.token,
        tokenType: 'Bearer',
        authState: {
          id: res.userInfo.id,
          email: res.userInfo.email,
          grade: res.userInfo.grade,
          name: res.userInfo.name,
          nickname: res.userInfo.nickname,
          point: res.userInfo.point,
          rank: res.userInfo.rank,
          univId: res.userInfo.univId
        },
        expiresIn: 60 * 60 * 24 * 1000
      }
      signIn(authData)
      enqueueSnackbar('안녕하세요, 사용자님!', { variant: 'success' })
      navigate('/')
    } catch (e) {
      enqueueSnackbar('로그인에 실패했어요. 나중에 다시 시도해주세요 :(', { variant: 'error' })
    }
  }

  return (
    <>
      <RoundWrapper>
        <Helmet>
          <title>로그인</title>
        </Helmet>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" py={2} alignItems="center">
            {/* <Logo /> */}
          </Box>
          <Card sx={{ p: 10, borderRadius: 0, borderTopRightRadius: 80, borderTopLeftRadius: 80 }}>
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginY: 20,
                maxWidth: 'sm'
              }}
            >
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '& .MuiTextField-root': { margin: 1 }
                }}
                onSubmit={handleSubmit}
              >
                <Typography variant="h3" component="div" gutterBottom>
                  로그인
                </Typography>
                <TextField
                  id="univId"
                  name="univId"
                  type="text"
                  label="(학교) 학번"
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="비밀번호"
                  onChange={handleChange}
                  fullWidth
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                  로그인
                </Button>
                <Link href="/auth/register" sx={{ mt: 1 }}>
                  아직 계정이 없으신가요?
                </Link>
              </Box>
            </Container>
          </Card>
        </Container>
        <Footer />
      </RoundWrapper>
    </>
  )
}

export default LoginScreen

export const RoundWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
)
