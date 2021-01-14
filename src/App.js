import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className='App'>
      <Navbar user={user} />
      <Switch>
        <Route exact path='/'>
          hello
        </Route>
        <Route path='/product/list'>
          <ProductList />
        </Route>
        <Route path='/product/save'>new product</Route>
        <Route path='/login'>
          <LoginForm setUser={setUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
