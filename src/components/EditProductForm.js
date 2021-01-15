import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import api from '../services/api';
import useForm from './useForm';

const EditProductForm = ({ user }) => {
  const params = useParams();
  const history = useHistory();

  if (!user) {
    history.push('/login');
  }

  const [productForm, handleProductInput, setProductForm] = useForm({
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
          id: params.id,
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
    setIngredients([
      ...ingredients,
      { id: ingredients.length + 1, ...ingredientForm },
    ]);
  };

  const deleteIngredient = id => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };

  useEffect(() => {
    api
      .get('/product/list', {
        headers: { Authorization: localStorage.Authorization },
      })
      .then(response => {
        const product = response.data.content.find(p => p.id === params.id);

        setProductForm({
          name: product.name,
          price: product.price,
          image: product.image,
        });

        setIngredients(product.ingredients);
      })
      .catch(err => console.log(err));
  });

  return (
    <div>
      <h2>Editar produto</h2>
      <form onSubmit={handleSubmitProduct}>
        <input
          placeholder='Nome do produto'
          name='name'
          value={productForm.name}
          onChange={handleProductInput}
        />
        <input
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
          placeholder='Quantidade'
          name='quantity'
          value={ingredientForm.quantity}
          onChange={handleIngredientInput}
        />
        <input
          placeholder='Custo'
          name='cost'
          value={ingredientForm.cost}
          onChange={handleIngredientInput}
        />
        <button type='submit'>Adicionar</button>
      </form>
      Ingredientes:
      {ingredients.map(ingredient => (
        <p key={ingredient.id}>
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

export default EditProductForm;
