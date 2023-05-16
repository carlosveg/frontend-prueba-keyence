import { SetStateAction } from 'react'
import { User } from '../models'
import { URL_API } from '../utils'

export const getUsers = async (
  setTableData: React.Dispatch<SetStateAction<User[]>>
) => {
  try {
    const response = await fetch(URL_API)
    const data = await response.json()

    setTableData(data)
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (
  username: string,
  date: Date,
  setTableData: React.Dispatch<SetStateAction<User[]>>
) => {
  try {
    await fetch(`${URL_API}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, date })
    })
    getUsers(setTableData)
  } catch (error) {
    console.log(error)
  }
}

interface Props {
  user: User
  setLoading: React.Dispatch<SetStateAction<boolean>>
  setSuccess: React.Dispatch<SetStateAction<boolean>>
  setRowId: React.Dispatch<SetStateAction<string | null>>
}

export const updateUser = async ({
  user,
  setLoading,
  setSuccess,
  setRowId
}: Props) => {
  setLoading(true)

  const result = await fetch(`${URL_API}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (result.ok) {
    setSuccess(true)
    setRowId(null)
  }

  setLoading(false)
}

export const loadDataFromFile = async ({
  dataAdapted
}: {
  dataAdapted: User[]
}) => {
  const result = await fetch(`${URL_API}/load`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataAdapted)
  })
  if (result.ok) {
    console.log('Se insertaron todos los datos')
  }
}
