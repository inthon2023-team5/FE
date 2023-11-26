import {
  alpha,
  Box,
  List,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  ListItem
} from '@mui/material'
import ExpandMore from '@mui/icons-material/ExpandMore'
import QuestionButton from 'src/components/QuestionButton'
import { useEffect, useState } from 'react'
import { QuestionHistory } from 'src/models/question'
import { getUserQuestionHistory } from 'src/api/user'
import { enqueueSnackbar } from 'notistack'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useNavigate } from 'react-router'
import { useAuthHeader } from 'react-auth-kit'

const QuestionList = () => {
  const [questionHistoryAnswer, setQuestionHistoryAnswer] = useState<QuestionHistory[]>([])
  const [questionHistoryQuestion, setQuestionHistoryQuestion] = useState<QuestionHistory[]>([])

  const navigate = useNavigate()
  const token = useAuthHeader()()

  const fetchQuestionHistory = async () => {
    try {
      const res = await getUserQuestionHistory(token)
      setQuestionHistoryAnswer(res.answers.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)).slice(0, 5))
      setQuestionHistoryQuestion(res.questions.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)).slice(0, 5))
    } catch (err) {
      enqueueSnackbar('질문 내역을 불러오는데 실패했습니다.', { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchQuestionHistory()
  }, [])

  const handleProfile = () => {
    navigate('/profile')
  }
  return (
    <>
      <MenuWrapper>
        <Accordion sx={{ backgroundColor: 'transparent' }}>
          <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'white' }} />}>
            <Typography variant="h4" color={'white'} ml={2}>
              내가 질문한 내역
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ margin: 0 }}>
            <SubMenuWrapper>
              <List component="div">
                {questionHistoryQuestion.map((question, idx) => (
                  <QuestionButton q={question} key={idx} />
                ))}
                <ListItem component="div" className="Mui-children">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    endIcon={<OpenInNewIcon />}
                    sx={{ color: 'white', fontWeight: 'bold' }}
                    onClick={handleProfile}
                  >
                    마이페이지에서 더보기
                  </Button>
                </ListItem>
              </List>
            </SubMenuWrapper>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: 'transparent' }}>
          <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'white' }} />}>
            <Typography variant="h4" color={'white'} ml={2}>
              내가 대답한 내역
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ margin: 0 }}>
            <SubMenuWrapper>
              <List component="div">
                {questionHistoryAnswer.map((question, idx) => (
                  <QuestionButton q={question} key={idx} />
                ))}
                <ListItem component="div" className="Mui-children">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    endIcon={<OpenInNewIcon />}
                    sx={{ color: 'white', fontWeight: 'bold' }}
                    onClick={handleProfile}
                  >
                    마이페이지에서 더보기
                  </Button>
                </ListItem>
              </List>
            </SubMenuWrapper>
          </AccordionDetails>
        </Accordion>
      </MenuWrapper>
    </>
  )
}

export default QuestionList

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
)

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create(['transform', 'opacity'])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
)
