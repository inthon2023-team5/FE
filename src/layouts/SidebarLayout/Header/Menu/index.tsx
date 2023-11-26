import { Box, List, ListItem, ListItemText } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'

const HeaderMenu = () => {
  return (
    <>
      <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem classes={{ root: 'MuiListItem-indicators' }} component={RouterLink} to="/">
            <ListItemText primaryTypographyProps={{ noWrap: true }} primary="전체" />
          </ListItem>
          <ListItem classes={{ root: 'MuiListItem-indicators' }} component={RouterLink} to="/school">
            <ListItemText primaryTypographyProps={{ noWrap: true }} primary="학교생활" />
          </ListItem>
          <ListItem classes={{ root: 'MuiListItem-indicators' }} component={RouterLink} to="/future">
            <ListItemText primaryTypographyProps={{ noWrap: true }} primary="진로" />
          </ListItem>
          <ListItem classes={{ root: 'MuiListItem-indicators' }} component={RouterLink} to="/course">
            <ListItemText primaryTypographyProps={{ noWrap: true }} primary="과목" />
          </ListItem>
        </List>
      </ListWrapper>
    </>
  )
}

export default HeaderMenu

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
)
