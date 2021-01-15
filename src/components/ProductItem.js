import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import api from '../services/api';

const ProductItem = ({ product }) => {
  const handleDelete = () => {
    api
      .delete(`/product/delete/${product.id}`, {
        headers: { Authorization: localStorage.Authorization },
      })
      .catch(err => console.log(err));
  };

  return (
    <Card className='my-2'>
      <Card.Img variant='top' src={product.image} />
      <Card.Body>
        <Card.Title as='h5'>{product.name}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          ${product.price}
        </Card.Subtitle>
        <Card.Text>Ingredientes:</Card.Text>
      </Card.Body>
      <ListGroup className='list-group-flush'>
        {product.ingredients.map(ingredient => (
          <ListGroup.Item key={ingredient.id}>
            {ingredient.name}, custo: ${ingredient.cost}, qtd:{' '}
            {ingredient.quantity}g/ml
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Body>
        <LinkContainer to={`/product/save/${product.id}`}>
          <Button size='sm'>Editar</Button>
        </LinkContainer>
        <Button onClick={handleDelete} variant='danger' size='sm'>
          Deletar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
