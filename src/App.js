import { Switch, Route } from 'react-router-dom';

import './App.css';

import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          hello
        </Route>
        <Route path='/product/list'>product list</Route>
        <Route path='/product/save'>new product</Route>
        <Route path='/login' component={LoginForm} />
      </Switch>
    </div>
  );
}

export default App;
