import { Alert, Snackbar } from '@mui/material'

interface Props {
  open: boolean
  handleClose: () => void
  success: boolean
}

const SnackBar: React.FC<Props> = ({ open, handleClose, success }) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={`${success ? 'success' : 'error'}`}
        sx={{ width: '100%' }}
      >
        {success ? 'Operación realizada con éxito!' : 'Ocurrió un error!'}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar
