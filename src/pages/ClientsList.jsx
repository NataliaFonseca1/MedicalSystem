import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/clients')
      .then(response => setClients(response.data))
      .catch(error => console.error('Erro ao obter lista de clientes:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Clientes</h2>
      <div className="row">
        {clients.map(client => (
          <div key={client.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{client.name}</h5>
                <p className="card-text">CPF: {client.cpf}</p>
                <p className="card-text">Data de Nascimento: {client.birthDate}</p>
                <p className="card-text">Peso: {client.weight} kg</p>
                <p className="card-text">Altura: {client.height} m</p>
                <p className="card-text">UF: {client.uf}</p>
                {/* Adicione botões de edição/exclusão aqui */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;
