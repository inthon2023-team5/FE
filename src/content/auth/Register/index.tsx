import { Helmet } from 'react-helmet-async'
import { useState } from 'react'

import { Container, Card, TextField, Link } from '@mui/material'
import Footer from 'src/components/Footer'
import DoneIcon from '@mui/icons-material/Done'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Grade, RegisterUser } from 'src/models/user'
import { postNicknameTest, postRegister } from 'src/api/auth'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router'
import { RoundWrapper } from '../Login'

const RegisterScreen = () => {
  const [registerInfo, setRegisterInfo] = useState<RegisterUser>({
    univId: '',
    name: '',
    nickname: '',
    rank: 0,
    email: '',
    grade: 'JUNIOR',
    password: '',
    confirmPassword: ''
  })

  const [isNicknameUnique, setIsNicknameUnique] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleCheckNickname = async () => {
    if (!registerInfo.nickname.length) {
      enqueueSnackbar('닉네임을 입력해주세요', { variant: 'warning' })
      return
    }
    try {
      const isUnique = await postNicknameTest(registerInfo.nickname)
      if (isUnique) {
        setIsNicknameUnique(true)
        enqueueSnackbar('사용가능한 닉네임이에요!', { variant: 'success' })
      } else {
        enqueueSnackbar('이미 존재하는 닉네임입니다.', { variant: 'error' })
      }
    } catch {
      enqueueSnackbar('닉네임 중복확인에 실패했습니다.', { variant: 'error' })
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterInfo({ ...registerInfo, [name]: value })
    if (name === 'nickname') {
      setIsNicknameUnique(false)
    }
  }

  const handleChangeButton: React.MouseEventHandler<HTMLButtonElement> = e => {
    setRegisterInfo({
      ...registerInfo,
      grade: e.currentTarget.value as Grade
    })
  }

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return '비밀번호는 8자 이상이어야 합니다.'
    } else if (password.search(/[0-9]/g) < 0) {
      return '비밀번호는 숫자를 포함해야 합니다.'
    } else if (password.search(/[a-zA-Z]/g) < 0) {
      return '비밀번호는 영문자를 포함해야 합니다.'
    }
    return ''
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (registerInfo.univId.length < 6) {
      enqueueSnackbar('학번/교번을 정확히 입력해주세요', { variant: 'warning' })
      return
    }
    if (!registerInfo.name.length || registerInfo.name.length < 2) {
      enqueueSnackbar('이름을 2자 이상 입력해주세요', { variant: 'warning' })
      return
    }
    if (!registerInfo.nickname.length) {
      enqueueSnackbar('닉네임을 입력해주세요', { variant: 'warning' })
      return
    }
    if (!isNicknameUnique) {
      enqueueSnackbar('닉네임 중복확인을 해주세요', { variant: 'warning' })
      return
    }
    if (!registerInfo.email.length) {
      enqueueSnackbar('이메일을 입력해주세요', { variant: 'warning' })
      return
    }
    if (!registerInfo.password.length) {
      enqueueSnackbar('비밀번호를 입력해주세요', { variant: 'warning' })
      return
    }
    if (validatePassword(registerInfo.password).length) {
      enqueueSnackbar(validatePassword(registerInfo.password), { variant: 'warning' })
      return
    }
    if (registerInfo.password !== registerInfo.confirmPassword) {
      enqueueSnackbar('비밀번호가 일치하지 않습니다.', { variant: 'warning' })
      return
    }

    try {
      const requestData = { ...registerInfo }
      delete requestData.confirmPassword
      await postRegister(requestData)
      enqueueSnackbar('회원가입이 완료되었습니다. 로그인 후 사용해주세요!', { variant: 'success' })
      navigate('/auth/login')
    } catch (err) {
      if (err.response.status === 409) {
        enqueueSnackbar('이미 존재하는 학번입니다.', { variant: 'error' })
        return
      }
      enqueueSnackbar('회원가입에 실패하였습니다. 다시시도해 주세요', { variant: 'error' })
    }
  }

  return (
    <>
      <RoundWrapper>
        <Helmet>
          <title>회원가입</title>
        </Helmet>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" py={2} alignItems="center">
            {/* <Logo /> */}
          </Box>
          <Card sx={{ p: 10, borderRadius: 0, borderTopRightRadius: 80, borderTopLeftRadius: 80 }}>
            <Typography variant="h3" component="div" gutterBottom>
              회원가입
            </Typography>
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
                <Box>
                  <Typography variant="h6" component="div" gutterBottom>
                    회원 유형
                  </Typography>
                  <Typography variant="caption" component="div" gutterBottom>
                    자유롭게 선택하실 수 있으나, 학번 앞자리는 공개됩니다. (ex: 20학번)
                  </Typography>
                </Box>
                <Box display={'flex'} width={'100%'} justifyContent={'space-between'} p={1}>
                  <Button
                    value={'PROFESSOR'}
                    name="PROFESSOR"
                    onClick={handleChangeButton}
                    variant={registerInfo.grade === 'PROFESSOR' ? 'contained' : 'outlined'}
                    sx={{ mr: 1 }}
                    fullWidth
                  >
                    교수진
                  </Button>
                  <Button
                    value={'SENIOR'}
                    name="SENIOR"
                    onClick={handleChangeButton}
                    variant={registerInfo.grade === 'SENIOR' ? 'contained' : 'outlined'}
                    sx={{ mr: 1 }}
                    fullWidth
                  >
                    선배
                  </Button>
                  <Button
                    value={'JUNIOR'}
                    name="JUNIOR"
                    onClick={handleChangeButton}
                    variant={registerInfo.grade === 'JUNIOR' ? 'contained' : 'outlined'}
                    fullWidth
                  >
                    후배
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <TextField
                    id="univId"
                    name="univId"
                    type="text"
                    label={`${registerInfo.grade === 'PROFESSOR' ? '교번' : '학번'}을 입력해주세요`}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <TextField
                    id="name"
                    name="name"
                    type="text"
                    label={'2자 이상의 이름을 입력해주세요'}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                  <TextField
                    id="nickname"
                    name="nickname"
                    type="text"
                    label={'사용하실 닉네임을 입력해주세요'}
                    onChange={handleChange}
                    sx={{ width: '70%' }}
                  />
                  {isNicknameUnique ? (
                    <Button sx={{ mr: 1 }} disabled>
                      <DoneIcon />
                    </Button>
                  ) : (
                    <Button sx={{ mr: 1 }} onClick={handleCheckNickname}>
                      중복확인
                    </Button>
                  )}
                </Box>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label={'학교 이메일을 입력해주세요 (..@korea.ac.kr)'}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="비밀번호 (6자 이상의 숫자, 영문 조합)"
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="비밀번호 확인"
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }} disabled={!isNicknameUnique}>
                  회원가입
                </Button>
                <Link href="/auth/login" sx={{ mt: 1 }}>
                  이미 계정이 있어요.
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

export default RegisterScreen
