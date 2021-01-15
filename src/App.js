import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} />
      <Switch>
        <Route path='/product/list'>
          <ProductList />
        </Route>
        <Route path='/product/save/:id'>
          <EditProductForm />
        </Route>
        <Route path='/product/save'>
          <AddProductForm />
        </Route>
        <Route path='/login'>
          <LoginForm setUser={setUser} />
        </Route>
        <Redirect from='/' exact to={user ? '/product/list' : '/login'} />
      </Switch>
    </Router>
  );
}

export default App;
