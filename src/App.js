import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/product/list'>
              <ProductList user={user} />
            </Route>
            <Route path='/product/save/:id'>
              <EditProductForm user={user} />
            </Route>
            <Route path='/product/save'>
              <AddProductForm user={user} />
            </Route>
            <Route path='/login'>
              <LoginForm setUser={setUser} />
            </Route>
            <Redirect from='/' exact to={user ? '/product/list' : '/login'} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
