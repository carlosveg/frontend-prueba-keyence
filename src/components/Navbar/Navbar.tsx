import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import styled from 'styled-components'

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Prueba técnica KEYENCE
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export const NavbarStyle = styled.div``

export default Navbar
