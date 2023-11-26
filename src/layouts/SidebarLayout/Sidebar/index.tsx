import {
  Box,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
  darken,
  IconButton,
  Typography,
  Container,
  Link
} from '@mui/material'

import QuestionList from './QuestionList'
import Logo from 'src/components/LogoSign'
import { LogoutOutlined } from '@mui/icons-material'
import { useAuthUser, useSignOut } from 'react-auth-kit'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router'

const Sidebar = () => {
  const authUser = useAuthUser()
  const user = authUser()
  const theme = useTheme()
  const signOut = useSignOut()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const handleLogout = (): void => {
    signOut()
    enqueueSnackbar('로그아웃 되었습니다. 나중에 또 뵐게요 :)', { variant: 'success' })
    navigate('/')
  }

  return (
    <>
      <SidebarWrapper
        sx={{
          display: { xs: 'none', lg: 'inline-block' },
          position: 'fixed',
          left: 0,
          top: 0,
          background:
            theme.palette.mode === 'dark'
              ? alpha(lighten(theme.header.background, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow: theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
        }}
      >
        <Box mt={3}>
          <Box mx={2} sx={{ width: 52, display: 'flex' }}>
            <Logo />
            <Typography variant={'h6'}>Univ Link</Typography>
          </Box>
        </Box>
        {user ? (
          <>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10]
              }}
            />
            <QuestionList />
            <Box p={2} bottom={0}>
              <IconButton onClick={handleLogout}>
                <LogoutOutlined sx={{ mx: 1, color: 'whitesmoke' }} />
                <Typography variant="body2" color={'whitesmoke'} sx={{ fontWeight: 'bold' }}>
                  로그아웃
                </Typography>
              </IconButton>
            </Box>
          </>
        ) : (
          <Container sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" component="div" gutterBottom textAlign={'center'} mb={2}>
                로그인하시면 더 많은 기능을 이용하실 수 있습니다.
              </Typography>
              <Typography textAlign={'center'}>
                <Link href="/auth/login" sx={{ mt: 1 }}>
                  로그인하러 가기
                </Link>
              </Typography>
            </Box>
          </Container>
        )}
      </SidebarWrapper>
    </>
  )
}

export default Sidebar

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
)
