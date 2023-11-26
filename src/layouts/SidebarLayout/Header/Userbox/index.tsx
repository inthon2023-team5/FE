import { useRef } from 'react'

import { useNavigate } from 'react-router-dom'

import { Avatar, Box, Button, Hidden, lighten, Typography } from '@mui/material'

import { styled } from '@mui/material/styles'
import { useAuthUser } from 'react-auth-kit'
import { GradeSet } from 'src/models/user'
import stringToHexColor from 'src/utils/stringToColor'

const HeaderUserbox = () => {
  const authUser = useAuthUser()
  const user = authUser()

  const ref = useRef<any>(null)
  const navigate = useNavigate()

  return (
    <>
      <UserBoxButton
        color="secondary"
        ref={ref}
        onClick={() => {
          navigate('/profile')
        }}
      >
        <Avatar sx={{ bgcolor: stringToHexColor(user.nickname) }}>{user.name[0]}</Avatar>
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.nickname}</UserBoxLabel>
            <UserBoxDescription variant="body2">{GradeSet[user.grade]}</UserBoxDescription>
          </UserBoxText>
        </Hidden>
      </UserBoxButton>
    </>
  )
}

export default HeaderUserbox
const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
)

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
)

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
)

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
)
