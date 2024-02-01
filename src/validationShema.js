import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório'),
  dataNascimento: Yup.date().required('Data de Nascimento é obrigatória'),
  peso: Yup.number().required('Peso é obrigatório').positive('Peso deve ser um número positivo'),
  altura: Yup.number().required('Altura é obrigatória').positive('Altura deve ser um número positivo'),
  uf: Yup.string().required('UF é obrigatória'),
});

export default validationSchema;
