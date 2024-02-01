import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const initialValues = {
  name: '',
  cpf: '',
  birthDate: '',
  weight: '',
  height: '',
  uf: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Campo obrigatório'),
  cpf: Yup.string().required('Campo obrigatório'),
  birthDate: Yup.date().required('Campo obrigatório'),
  weight: Yup.number().required('Campo obrigatório'),
  height: Yup.number().required('Campo obrigatório'),
  uf: Yup.string().required('Campo obrigatório'),
});

const NurseDashboard = () => {
  const [ufsList, setUfsList] = useState([]);

  useEffect(() => {
    const fetchUFs = async () => {
      try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        setUfsList(response.data);
      } catch (error) {
        console.error('Erro ao buscar a lista de estados:', error);
      }
    };

    fetchUFs();
  }, []);

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/clients', values);
      console.log('Cadastro de paciente realizado com sucesso:', response.data, values);
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop: '20px' }}>
      <h2>Cadastro de Pacientes</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formName" style={{ marginBottom: '20px' }}>
          <Form.Label style={{ textAlign: 'left', display: 'block' }}>Nome:</Form.Label>
          <Form.Control type="text" placeholder="Digite o nome" {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formCPF" style={{ marginBottom: '20px' }}>
          <Form.Label style={{ textAlign: 'left', display: 'block' }}>CPF:</Form.Label>
          <Form.Control type="text" placeholder="Digite o CPF" {...formik.getFieldProps('cpf')} />
          {formik.touched.cpf && formik.errors.cpf ? (
            <div className="error">{formik.errors.cpf}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formDataNascimento" style={{ marginBottom: '20px' }}>
          <Form.Label style={{ textAlign: 'left', display: 'block' }}>Data de Nascimento:</Form.Label>
          <Form.Control type="date" {...formik.getFieldProps('birthDate')} />
          {formik.touched.birthDate && formik.errors.birthDate ? (
            <div className="error">{formik.errors.birthDate}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formPeso" style={{ marginBottom: '20px' }}>
          <Form.Label style={{ textAlign: 'left', display: 'block' }}>Peso (Kg):</Form.Label>
          <Form.Control type="number" placeholder="Digite o peso" {...formik.getFieldProps('weight')} />
          {formik.touched.weight && formik.errors.weight ? (
            <div className="error">{formik.errors.weight}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formAltura" style={{ marginBottom: '20px' }}>
          <Form.Label style={{ textAlign: 'left', display: 'block' }}>Altura (m):</Form.Label>
          <Form.Control type="number" placeholder="Digite a altura" {...formik.getFieldProps('height')} />
          {formik.touched.height && formik.errors.height ? (
            <div className="error">{formik.errors.height}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formUF">
          <Form.Label style={{ textAlign: 'left', display: 'block' }}>UF:</Form.Label>
          <Form.Control as="select" {...formik.getFieldProps('uf')}>
            <option value="" disabled>
              Selecione a UF
            </option>
            {ufsList.map((uf) => (
              <option key={uf.id} value={uf.sigla}>
                {uf.sigla}
              </option>
            ))}
          </Form.Control>
          {formik.touched.uf && formik.errors.uf ? (
            <div className="error">{formik.errors.uf}</div>
          ) : null}
        </Form.Group>

        <Button variant="dark" type="submit" style={{ marginTop: '10px' }}>
          Cadastrar
        </Button>
      </Form>
    </div>
  );
};

export default NurseDashboard;
