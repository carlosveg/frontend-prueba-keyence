import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'

interface Props {
  title: string
  open: boolean
  handleClose: () => void
  children: React.ReactNode
}

const DialogComponent: React.FC<Props> = ({
  title,
  open,
  handleClose,
  children
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {title === 'Detalles' && (
        <DialogActions>
          <Button onClick={handleClose} color='error'>
            Cerrar
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default DialogComponent
