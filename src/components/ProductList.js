import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ProductItem from './ProductItem';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://prova.profranchising.com.br/product/list?page=${itemsPerPage}&size=${pageNumber}`,
        {
          headers: { Authorization: localStorage.Authorization },
        }
      )
      .then(response => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(err => console.log(err));
  }, [itemsPerPage, pageNumber]);

  return (
    <div>
      <h2>Lista de produtos</h2>

      <label htmlFor='teste'>Itens por página</label>
      <select
        name='numberOfPages'
        id='teste'
        onSelect={e => setItemsPerPage(e.target.value)}
      >
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='50'>50</option>
      </select>
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}

      <ul>
        {[...Array(totalPages).keys()].map(index => (
          <li key={index}>
            <a href='#' onClick={() => setPageNumber(index + 1)}>
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
