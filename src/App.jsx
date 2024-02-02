import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import { AuthProvider } from './AuthContext'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NurseDrashboard from './pages/NuserDrashboard/NurseDrashboard'
import LoginPage from './pages/LoginPage/LoginPage'
import DoctorHomePage from './pages/DoctorDrashboard/DoctorHomePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/doctor"
          element={<DoctorHomePage />}
          roles={['ROLE_MEDICO']}
        />
        <Route
          path="/nurse"
          element={<NurseDrashboard />}
          roles={['ROLE_ENFERMEIRO']}
        />
      </Routes>
    </Router>
  )
}

export default App
