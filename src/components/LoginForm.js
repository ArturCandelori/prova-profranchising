import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import api from '../services/api';
import useForm from './useForm';

const LoginForm = ({ setUser }) => {
  const history = useHistory();

  const [loginForm, handleLoginChange] = useForm({
    username: '',
    password: '',
  });

  const handleSubmit = e => {
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
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Nome'
          name='username'
          value={loginForm.username}
          onChange={handleLoginChange}
        />
        <input
          type='password'
          placeholder='Senha'
          name='password'
          value={loginForm.password}
          onChange={handleLoginChange}
        />
        <button type='submit'>Entrar</button>
      </form>
    </div>
  );
};

export default LoginForm;
