import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('https://prova.profranchising.com.br/auth/login', {
        username,
        password,
      })
      .then(response => {
        console.log(response.data);
        setUser(response.data.name);
        console.log(response.headers.authorization);
        window.localStorage.setItem('token', response.headers.authorization);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Nome'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Senha'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Entrar</button>
      </form>
    </div>
  );
};

export default LoginForm;
