import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductItem = ({ product }) => {
  const handleDelete = () => {
    axios
      .delete(
        `https://prova.profranchising.com.br/product/delete/${product.id}`,
        { headers: { Authorization: localStorage.Authorization } }
      )
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <img src={product.image} width='200' alt='produto' />
      {product.ingredients.map(ingredient => (
        <p>
          Ingrediente: {ingredient.name} Quantidade: {ingredient.quantity}{' '}
          Custo: {ingredient.cost}
        </p>
      ))}
      <Link to={`/product/save/${product.id}`}>
        <button>Editar</button>
      </Link>
      <button onClick={handleDelete}>Deletar</button>
    </div>
  );
};

export default ProductItem;
