import {
  Routes,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Cadastrar from './pages/cadastrar'
import { getItem } from './services/storage'
import { GlobalProvider } from './context/GlobalContext'

function ProtegerRotas({ redirectTo }) {
  const estaAutenticado = getItem('token')

  return estaAutenticado ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
  return (
      <GlobalProvider>
        <Routes>
        <Route path="/cadastre-se" element={<Cadastrar />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtegerRotas redirectTo="/login" />}>
          <Route path="/home" exact element={<Home />} />
          <Route path="/" element={<Login />} />
        </Route>
        </Routes>
      </GlobalProvider>
  )
}
export default MainRoutes
