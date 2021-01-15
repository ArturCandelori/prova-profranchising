import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = ({ user, setUser }) => {
  return (
    <header>
      <Navbar bg='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Sistema Interno</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              {user ? (
                <Nav.Link onClick={() => setUser(null)}>
                  <i className='fas fa-user'></i> Logout
                </Nav.Link>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to='/product/list'>
                <Nav.Link>Lista de produtos</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/product/save'>
                <Nav.Link>Adicionar produto</Nav.Link>
              </LinkContainer>
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
