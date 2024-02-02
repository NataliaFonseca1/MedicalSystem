import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Importe o AuthProvider

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DoctorDrashboard from './pages/DoctorDrashboard/DoctorDrashboard';
import NurseDrashboard from './pages/NuserDrashboard/NurseDrashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import DoctorHomePage from './pages/DoctorHomePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/doctor" element={<DoctorHomePage />} roles={['ROLE_MEDICO']} />
          <Route path="/nurse" element={<NurseDrashboard />} roles={['ROLE_ENFERMEIRO']} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
