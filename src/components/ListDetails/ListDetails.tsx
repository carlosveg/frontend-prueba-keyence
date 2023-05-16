import {
  AccessTimeFilled,
  CalendarMonth,
  Numbers,
  Person
} from '@mui/icons-material'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { User } from '../../models'

const ListDetails = ({ user }: { user: User }) => {
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Numbers />
        </ListItemIcon>
        <ListItemText primary={user.user_id} secondary='UserID' />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={user.username} secondary='User Name' />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CalendarMonth />
        </ListItemIcon>
        <ListItemText primary={user.date.toString()} secondary='Date' />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AccessTimeFilled />
        </ListItemIcon>
        <ListItemText primary={user.punch_in} secondary='Punch in' />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AccessTimeFilled />
        </ListItemIcon>
        <ListItemText primary={user.punch_out} secondary='Punch out' />
      </ListItem>
    </List>
  )
}

export default ListDetails
