import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'

const ClientList = () => {
  const [clients, setClients] = useState([])
  const [editingClientId, setEditingClientId] = useState(null)
  const [editedName, setEditedName] = useState('')
  const [editedHeight, setEditedHeight] = useState('')
  const [editedWeight, setEditedWeight] = useState('')
  const [editedCPF, setEditedCPF] = useState('')
  const [editedBirthDate, setEditedBirthDate] = useState('')
  const [editedUF, setEditedUF] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:8080/clients')
      .then((response) => setClients(response.data))
      .catch((error) =>
        console.error('Erro ao obter lista de clientes:', error)
      )
  }, [])

  const handleEdit = (
    clientId,
    clientName,
    clientHeight,
    clientWeight,
    clientCPF,
    clientBirthDate,
    clientUF
  ) => {
    setEditingClientId(clientId)
    setEditedName(clientName)
    setEditedHeight(clientHeight.toString())
    setEditedWeight(clientWeight.toString())
    setEditedCPF(clientCPF)
    setEditedBirthDate(clientBirthDate)
    setEditedUF(clientUF)
  }

  const handleSave = (clientId) => {
    axios
      .put(`http://localhost:8080/clients`, {
        id: clientId,
        name: editedName,
        height: parseFloat(editedHeight),
        weight: parseFloat(editedWeight),
        cpf: editedCPF,
        birthDate: editedBirthDate,
        uf: editedUF
      })
      .then((response) => {
        setClients((prevClients) =>
          prevClients.map((c) =>
            c.id === response.data.id ? response.data : c
          )
        )
        setEditingClientId(null)
        setEditedName('')
        setEditedHeight('')
        setEditedWeight('')
        setEditedCPF('')
        setEditedBirthDate('')
        setEditedUF('')
      })
      .catch((error) => console.error('Erro ao editar cliente:', error))
  }

  const handleDelete = (clientId) => {
    axios
      .delete(`http://localhost:8080/clients/${clientId}`)
      .then(() => {
        setClients((prevClients) =>
          prevClients.filter((c) => c.id !== clientId)
        )
      })
      .catch((error) => console.error('Erro ao excluir cliente:', error))
  }

  const handleCancelEdit = () => {
    setEditingClientId(null)
    setEditedName('')
    setEditedHeight('')
    setEditedWeight('')
    setEditedCPF('')
    setEditedBirthDate('')
    setEditedUF('')
  }
  const handleLogout = () => {
    window.location.href = '/'
  }
  return (
    <div className="container mt-4">
      <h2>Lista de Clientes</h2>
      <div className="row">
        {clients.map((client) => (
          <div key={client.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  {editingClientId === client.id ? (
                    <Form.Control
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    client.name
                  )}
                </h5>
                <p className="card-text">CPF: {client.cpf}</p>
                <p className="card-text">
                  Data de Nascimento: {client.birthDate}
                </p>
                <p className="card-text">
                  Peso (kg):{' '}
                  {editingClientId === client.id ? (
                    <Form.Control
                      type="text"
                      value={editedWeight}
                      onChange={(e) => setEditedWeight(e.target.value)}
                    />
                  ) : (
                    client.weight
                  )}
                </p>
                <p className="card-text">
                  Altura(m):{' '}
                  {editingClientId === client.id ? (
                    <Form.Control
                      type="text"
                      value={editedHeight}
                      onChange={(e) => setEditedHeight(e.target.value)}
                    />
                  ) : (
                    client.height
                  )}
                </p>
                <p className="card-text">UF: {client.uf}</p>
                {editingClientId === client.id ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() => handleSave(client.id)}
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="secondary"
                      className="ml-2"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleEdit(
                          client.id,
                          client.name,
                          client.height,
                          client.weight,
                          client.cpf,
                          client.birthDate,
                          client.uf
                        )
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      className="ml-2"
                      onClick={() => handleDelete(client.id)}
                    >
                      Excluir
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
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
export default ClientList
