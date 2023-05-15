import { Route, Routes } from 'react-router-dom'
import { FormCreate, Navbar, UsersTable } from './components'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<UsersTable />} />
      </Routes>
    </>
  )
}

export default App
