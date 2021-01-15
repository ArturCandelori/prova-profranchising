import React, { useState } from 'react';
import axios from 'axios';

import useForm from './useForm';

const AddProductForm = () => {
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

    axios
      .post(
        'https://prova.profranchising.com.br/product/save',
        {
          id: 0,
          ...productForm,
          ingredients,
        },
        { headers: { Authorization: localStorage.Authorization } }
      )
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  const handleSubmitIngredient = e => {
    e.preventDefault();
    setIngredients([
      ...ingredients,
      { id: ingredients.length + 1, ...ingredientForm },
    ]);
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
        <ul key={ingredient.id}>
          {ingredient.name}
          <li>{ingredient.quantity}</li>
          <li>{ingredient.cost}</li>
        </ul>
      ))}
    </div>
  );
};

export default AddProductForm;
