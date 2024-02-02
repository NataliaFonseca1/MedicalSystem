import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import axios from 'axios';
import { useAuth } from '../../AuthContext'

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [userCpf, setUserCpf] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userType, setUserType] = useState('doctor');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    const loginUser = async () => {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          name: userName,
          cpf: userCpf,
          password: userPassword,
          role: userType,
        });
        const { token, role } = response.data;
        login({ token, role });
        if (role === 'ROLE_MEDICO') {
          navigate('/doctor');
        } else if (role === 'ROLE_ENFERMEIRO') {
          navigate('/nurse');
        }
      } catch (error) {
        console.error('Erro no login:', error);
      }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="text-center mb-3">
        <img src={logo} alt="Medial Systems Logo" style={{ maxWidth: '25%', height: 'auto' }} />
      </div>
      <h2 style={{ marginBottom: '20px' }}>MEDIAL SYSTEMS</h2>
      <p>Sua empresa na palma da mão</p>
      <h3 className="text-center mb-4">Login</h3>
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left', display: 'block' }}>
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left', display: 'block' }}>
          CPF:
        </label>
        <input
          type="text"
          className="form-control"
          value={userCpf}
          onChange={(e) => setUserCpf(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left', display: 'block' }}>
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left' }}>
          User Type:
        </label>
        <select
          className="form-select"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
        </select>
      </div>
      <button className="btn btn-dark" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
}
export default LoginPage
