import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../services/api';

const ProductItem = ({ product }) => {
  const history = useHistory();

  const handleDelete = () => {
    api
      .delete(`/product/delete/${product.id}`, {
        headers: { Authorization: localStorage.Authorization },
      })
      .then(response => {
        console.log(response);
        history.push('/product/list');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <img src={product.image} width='200' alt='produto' />
      {product.ingredients.map((ingredient, i) => (
        <p key={i}>
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
