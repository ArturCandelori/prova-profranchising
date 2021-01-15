import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';

import api from '../services/api';
import useForm from './useForm';
import FormContainer from './FormContainer';

let loginSchema = yup.object().shape({
  username: yup.string().required('Insira o nome do usuário'),
  password: yup.string().min(6, 'Senha deve ter pelo menos 6 dígitos'),
});

const LoginForm = ({ setUser }) => {
  const history = useHistory();

  const [loginForm, handleLoginChange] = useForm({
    username: '',
    password: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();

    api
      .post('/auth/login', {
        ...loginForm,
      })
      .then(response => {
        setUser(response.data.name);
        localStorage.setItem('Authorization', response.headers.authorization);
        history.push('/product/list');
      })
      .catch(err => console.log(err));
  };

  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='username'>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nome do usuário'
            name='username'
            value={loginForm.username}
            onChange={handleLoginChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type='password'
            placeholder='Digite sua senha'
            name='password'
            value={loginForm.password}
            onChange={handleLoginChange}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Entrar
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
