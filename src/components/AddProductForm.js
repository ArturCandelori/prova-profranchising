import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import * as yup from 'yup';

import api from '../services/api';
import useForm from './useForm';

const productSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required('Preencha todos os campos'),
  price: yup.string().required('Preencha todos os campos'),
  image: yup.string().url().required('Preencha todos os campos'),
  ingredients: yup.array(
    yup.object().shape({
      id: yup.number().required(),
      name: yup.string().required('Preencha todos os campos'),
      cost: yup.string().required('Preencha todos os campos'),
      quantity: yup.string().required('Preencha todos os campos'),
    })
  ),
});

const ingredientSchema = yup.object().shape({
  name: yup.string().required('Preencha todos os campos'),
  cost: yup.string().required('Preencha todos os campos'),
  quantity: yup.string().required('Preencha todos os campos'),
});

const AddProductForm = ({ user }) => {
  const history = useHistory();

  if (!user) {
    history.push('/login');
  }

  const [productForm, handleProductInput] = useForm({
    name: '',
    price: '',
    image: '',
  });
  const [ingredientForm, handleIngredientInput] = useForm({
    name: '',
    quantity: '',
    cost: '',
  });
  const [ingredients, setIngredients] = useState([]);
  const [validationError, setValidationError] = useState(null);

  const handleSubmitProduct = async e => {
    e.preventDefault();

    try {
      await productSchema.validate({
        id: 0,
        ...productForm,
        ingredients,
      });

      await api.post(
        '/product/save',
        {
          id: 0,
          ...productForm,
          ingredients,
        },
        { headers: { Authorization: localStorage.Authorization } }
      );

      history.push('/product/list');
    } catch (err) {
      console.log(err);
      setValidationError(err.message);
    }
  };

  const handleSubmitIngredient = async e => {
    e.preventDefault();

    try {
      await ingredientSchema.validate(ingredientForm);

      setIngredients([...ingredients, { id: 0, ...ingredientForm }]);
    } catch (err) {
      console.log(err);
      setValidationError(err.message);
    }
  };

  const deleteIngredient = i => {
    setIngredients(
      ingredients.filter(ingredient => ingredients.indexOf(ingredient) !== i)
    );
  };

  return (
    <>
      <Container>
        <Row>
          {validationError && (
            <h3 className='text-danger'>{validationError}</h3>
          )}
          <Col xs={12} md={6} className='my-3'>
            <h2>Enviar produto</h2>
            <Form onSubmit={handleSubmitProduct}>
              <Form.Group controlId='name'>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Nome do produto'
                  name='name'
                  value={productForm.name}
                  onChange={handleProductInput}
                />
              </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Preço'
                  name='price'
                  value={productForm.price}
                  onChange={handleProductInput}
                />
              </Form.Group>
              <Form.Group controlId='image'>
                <Form.Label>Imagem</Form.Label>
                <Form.Control
                  type='url'
                  placeholder='URL da imagem'
                  name='image'
                  value={productForm.image}
                  onChange={handleProductInput}
                />
              </Form.Group>
              <Button type='submit'>Enviar</Button>
            </Form>
          </Col>
          <Col xs={12} md={6} className='my-3'>
            <h2>Adicionar ingrediente:</h2>
            <Form onSubmit={handleSubmitIngredient}>
              <Form.Group controlId='nome'>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Nome do ingrediente'
                  name='name'
                  value={ingredientForm.name}
                  onChange={handleIngredientInput}
                />
              </Form.Group>
              <Form.Group controlId='quantity'>
                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Quantidade utilizada'
                  name='quantity'
                  value={ingredientForm.quantity}
                  onChange={handleIngredientInput}
                />
              </Form.Group>
              <Form.Group controlId='cost'>
                <Form.Label>Custo</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Custo do ingrediente'
                  name='cost'
                  value={ingredientForm.cost}
                  onChange={handleIngredientInput}
                />
              </Form.Group>
              <Button type='submit'>Adicionar</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <h2>Ingredientes:</h2>
      <ListGroup>
        {ingredients.map((ingredient, i) => (
          <ListGroup.Item key={i}>
            Ingrediente: {ingredient.name} Quantidade: {ingredient.quantity}{' '}
            Custo: {ingredient.cost}{' '}
            <Button
              className='ml-auto'
              variant='danger'
              size='sm'
              onClick={() => deleteIngredient(i)}
            >
              Apagar
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default AddProductForm;
