
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DoctorDrashboard from './pages/DoctorDrashboard/DoctorDrashboard';
import NurseDrashboard from './pages/NuserDrashboard/NurseDrashboard';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/doctor" element={<DoctorDrashboard />} />
        <Route path="/nurse" element={<NurseDrashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
