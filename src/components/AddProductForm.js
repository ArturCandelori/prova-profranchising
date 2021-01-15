import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import useForm from './useForm';

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

  const handleSubmitProduct = e => {
    e.preventDefault();

    api
      .post(
        '/product/save',
        {
          id: 0,
          ...productForm,
          ingredients,
        },
        { headers: { Authorization: localStorage.Authorization } }
      )
      .then(response => {
        console.log(response);
        history.push('/product/list');
      })
      .catch(err => console.log(err));
  };

  const handleSubmitIngredient = e => {
    e.preventDefault();
    setIngredients([...ingredients, { id: 0, ...ingredientForm }]);
  };

  const deleteIngredient = id => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };

  return (
    <div>
      <h2>Adicionar produto</h2>
      <form onSubmit={handleSubmitProduct}>
        <input
          placeholder='Nome do produto'
          name='name'
          value={productForm.name}
          onChange={handleProductInput}
        />
        <input
          type='number'
          placeholder='Preço'
          name='price'
          value={productForm.price}
          onChange={handleProductInput}
        />
        <input
          placeholder='URL da imagem'
          name='image'
          value={productForm.image}
          onChange={handleProductInput}
        />
        <button type='submit'>Enviar</button>
      </form>
      Adicionar ingrediente:
      <form onSubmit={handleSubmitIngredient}>
        <input
          placeholder='Nome'
          name='name'
          value={ingredientForm.name}
          onChange={handleIngredientInput}
        />
        <input
          type='number'
          placeholder='Quantidade'
          name='quantity'
          value={ingredientForm.quantity}
          onChange={handleIngredientInput}
        />
        <input
          type='number'
          placeholder='Custo'
          name='cost'
          value={ingredientForm.cost}
          onChange={handleIngredientInput}
        />
        <button type='submit'>Adicionar</button>
      </form>
      Ingredientes:
      {ingredients.map((ingredient, i) => (
        <p key={i}>
          Ingrediente: {ingredient.name} Quantidade: {ingredient.quantity}{' '}
          Custo: {ingredient.cost}{' '}
          <button onClick={() => deleteIngredient(ingredient.id)}>
            Apagar
          </button>
        </p>
      ))}
    </div>
  );
};

export default AddProductForm;
