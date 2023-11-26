import { FC } from 'react'
import PropTypes from 'prop-types'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import { Typography, Button, Grid } from '@mui/material'

interface PageTitleProps {
  heading?: string
  subHeading?: string
  buttonTitle?: string
  buttonLink?: string
  docs?: string
}

const PageTitle: FC<PageTitleProps> = ({
  heading = '',
  buttonTitle = '',
  subHeading = '',
  buttonLink = '',
  docs = '', // TODO: remove
  ...rest
}) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" {...rest}>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle2">{subHeading}</Typography>
      </Grid>
      {buttonTitle && (
        <Grid item>
          <Button
            href={buttonLink}
            rel="noopener noreferrer"
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {buttonTitle}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  buttonLink: PropTypes.string
}

export default PageTitle
