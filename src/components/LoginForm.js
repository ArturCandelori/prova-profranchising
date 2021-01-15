import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import * as yup from 'yup';

import api from '../services/api';
import useForm from './useForm';
import { useState } from 'react';

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
  const [validationError, setValidationError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await loginSchema.validate(loginForm);

      const response = await api.post('/auth/login', {
        ...loginForm,
      });

      setUser(response.data.name);
      localStorage.setItem('Authorization', response.headers.authorization);
      history.push('/product/list');
    } catch (err) {
      console.log(err);
      setValidationError(err.message);
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Login</h1>
          {validationError && (
            <h3 className='text-danger'>{validationError}</h3>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='username'>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nome do usuário'
                name='username'
                value={loginForm.username}
                onChange={handleLoginChange}
              />
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type='password'
                placeholder='Digite sua senha'
                name='password'
                value={loginForm.password}
                onChange={handleLoginChange}
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
