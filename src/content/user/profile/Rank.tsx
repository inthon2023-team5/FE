import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import { BadgeSet } from 'src/models/user'

interface RankBadgeProps {
  rank: number
}

const badgeColor = {
  BRONZE: '#cd7f32',
  SILVER: '#c0c0c0',
  GOLD: '#ffd700',
  PLATINUM: '#00ced1',
  DIAMOND: '#b9f2ff'
}

const RankBadge = ({ rank }: RankBadgeProps) => {
  const badgeType = BadgeSet[rank].split(' ')[0]
  return <MilitaryTechIcon sx={{ fontSize: 38, color: badgeColor[badgeType] }} />
}

export default RankBadge
