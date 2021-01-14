import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <img src={product.image} width='200' alt='produto' />
      <Link to='#'>Ver detalhes</Link>
    </div>
  );
};

export default ProductItem;
