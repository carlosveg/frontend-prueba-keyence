import { Route, Routes } from 'react-router-dom'
import { FormCreate, Navbar } from './components'
import { Home } from './pages'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
