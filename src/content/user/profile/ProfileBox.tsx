import { Avatar, Box, Card, CardHeader, Chip, Divider, Typography } from '@mui/material'
import { useAuthUser } from 'react-auth-kit'
import { BadgeSet, GradeSet } from 'src/models/user'
import stringToHexColor from 'src/utils/stringToColor'
import Rank from './Rank'

const ProfileBox = () => {
  const authUser = useAuthUser()
  const user = authUser()
  return (
    <Card>
      <CardHeader title="내 프로필" />
      <Divider />
      <Box p={2} display={'flex'}>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
          <Avatar sx={{ bgcolor: stringToHexColor(user.nickname) }} sizes="large">
            {user.nickname[0]}
          </Avatar>
        </Box>
        <Box ml={4}>
          <Box display={'flex'} alignItems={'center'}>
            <Typography variant="h4">{user.nickname}</Typography>
            <Chip label={GradeSet[user.grade]} size="small" color="primary" sx={{ ml: 1 }} />
          </Box>
          <Box display={'flex'} alignItems={'center'} mt={1}>
            <Typography variant="body2">
              {user.univId} / {user.name}
            </Typography>
          </Box>
        </Box>
        <Box ml={'auto'}>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Rank rank={user.rank} />
            <Typography variant="h5">{BadgeSet[user.rank]}</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'}>
            <Typography>보유 포인트: &nbsp;</Typography>
            <Typography variant="h4">{user.point}</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default ProfileBox
