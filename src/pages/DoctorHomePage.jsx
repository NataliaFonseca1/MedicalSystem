import { useState } from 'react'
import DoctorDashboard from './DoctorDrashboard/DoctorDrashboard'
import MapComponent from './MapComponent'
import ClientList from './ClientsList'
import NurseList from './NursesControl'

const DoctorHomePage = () => {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4" style={{ fontFamily: 'cursive', fontSize: '2rem' }}>
        MEDICAL DASHBOARD
      </h2>
      <p className="text-center mt-3" style={{ fontSize: '1.2rem' }}>
        O que deseja acessar?
      </p>
      <div className="d-sm-flex justify-content-center">
        <button
          onClick={() => handleOptionClick('cadastrar')}
          className="btn btn-dark btn-lg mb-3 me-3"
        >
          Cadastrar Paciente
        </button>
        <button
          onClick={() => handleOptionClick('estado')}
          className="btn btn-dark btn-lg mb-3 me-3"
        >
          Pacientes por Estado
        </button>
        <button
          onClick={() => handleOptionClick('lista')}
          className="btn btn-dark btn-lg mb-3 me-3"
        >
          Lista de Pacientes
        </button>
        <button
          onClick={() => handleOptionClick('controle')}
          className="btn btn-dark btn-lg mb-3"
        >
          Controle de Enfermeiros
        </button>
      </div>

      {selectedOption === 'cadastrar' && <DoctorDashboard option="cadastrar" />}
      {selectedOption === 'estado' && <MapComponent option="estado" />}
      {selectedOption === 'lista' && <ClientList option="lista" />}
      {selectedOption === 'controle' && <NurseList option="controle" />}
    </div>
  )
}

export default DoctorHomePage
