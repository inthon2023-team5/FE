import { Button, Dialog, DialogActions, Typography } from '@mui/material'

interface CustomDialogProps {
  text: string
  open: boolean
  primaryText?: string
  cancelText?: string
  onClose: () => void
  onClickPrimary?: () => void
}

const CustomDialog = (props: CustomDialogProps) => {
  const { cancelText, primaryText, text, open, onClose, onClickPrimary } = props
  return (
    <Dialog open={open} onClose={onClose}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mt: 2, maxWidth: 300, p: 2 }}>
        {text}
      </Typography>
      {(cancelText || primaryText) && (
        <DialogActions>
          {cancelText && <Button onClick={onClose}>{cancelText}</Button>}
          {primaryText && (
            <Button onClick={onClickPrimary} autoFocus>
              {primaryText}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default CustomDialog
