import { UploadFile } from '@mui/icons-material'
import { Button } from '@mui/material'
import { User, UserExcel } from '../../models'
import { ChangeEvent, SetStateAction, useState } from 'react'
import * as XLSX from 'xlsx'
import { createAddaptedUsers } from '../../adapters'
import { getUsers, loadDataFromFile } from '../../Services'
import { URL_API } from '../../utils'

interface Props {
  setTableData: React.Dispatch<SetStateAction<User[]>>
}

const LoadExcelFile: React.FC<Props> = ({ setTableData }) => {
  const [data, setData] = useState<User>()
  const [filename, setFilename] = useState('')

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    const { name } = file
    setFilename(name)

    const reader = new FileReader()

    reader.readAsBinaryString(file)
    reader.onload = async (evt) => {
      const data = evt.target?.result
      const workbook = XLSX.read(data, {
        type: 'binary',
        cellDates: true,
        cellNF: false,
        cellText: false
      })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const data2JSON = XLSX.utils.sheet_to_json<UserExcel>(sheet)

      console.log(data2JSON)
      const dataAdapted = createAddaptedUsers(data2JSON)
      console.log(dataAdapted)

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

      getUsers(setTableData)
    }
  }

  return (
    <Button
      component='label'
      variant='outlined'
      startIcon={<UploadFile />}
      sx={{ marginRight: '1rem', marginBottom: 4 }}
    >
      Subir archivo excel
      <input
        type='file'
        accept='.xlsx, .xls'
        hidden
        onChange={handleFileUpload}
      />
    </Button>
  )
}

export default LoadExcelFile
