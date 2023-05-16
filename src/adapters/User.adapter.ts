import { User, User2, UserExcel } from '../models'

export const createAddaptedUsers = (usersExcel: UserExcel[]) => {
  return usersExcel.map((user: UserExcel) => {
    const formattedUser: User2 = {
      user_id: +user['User ID'],
      username: user['User Name'],
      date: new Date(user['Date']).toLocaleDateString(),
      punch_in: new Date(user['Punch In']).toLocaleTimeString([], {
        hour12: false,
        hourCycle: 'h23'
      }),
      punch_out: new Date(user['Punch Out']).toLocaleTimeString([], {
        hour12: false,
        hourCycle: 'h23'
      })
    }

    return formattedUser
  })
}
