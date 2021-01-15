import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ user, setUser }) => {
  return (
    <header>
      <Navbar bg='light' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='#home'>Sistema Interno</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              {user ? (
                <Nav.Link onClick={() => setUser(null)}>
                  <i className='fas fa-user'></i> Logout
                </Nav.Link>
              ) : (
                <Nav.Link>Login</Nav.Link>
              )}
              <Nav.Link>Lista de produtos</Nav.Link>
              <Nav.Link>Adicionar produto</Nav.Link>
            </Nav>
            <Nav className='ml-auto'>
              {user ? `Olá, ${user}` : 'Faça login para acessar o sistema'}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
