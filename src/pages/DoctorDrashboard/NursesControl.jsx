import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'

const NurseList = () => {
  const [nurses, setNurses] = useState([])

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/nurses')
        setNurses(response.data)
      } catch (error) {
        console.error('Erro ao obter a lista de enfermeiros:', error)
      }
    }

    fetchNurses()
  }, [])
  const handleLogout = () => {
    window.location.href = '/'
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Enfermeiros</h2>
      <ul className="list-group">
        {nurses.map((nurse) => (
          <>
            <li key={nurse.id} className="list-group-item">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="mb-1">Nome: {nurse.name}</h5>
                  <small>CPF: {nurse.cpf}</small>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
      <Button
        variant="danger"
        onClick={handleLogout}
        style={{ marginTop: '10px' }}
      >
        Logout
      </Button>
    </div>
  )
}

export default NurseList
