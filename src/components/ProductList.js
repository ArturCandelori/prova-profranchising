import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import api from '../services/api';

import ProductItem from './ProductItem';

const ProductList = ({ user }) => {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  if (!user) {
    history.push('/login');
  }

  useEffect(() => {
    api
      .get(`/product/list?page=${pageNumber}&size=${itemsPerPage}`, {
        headers: { Authorization: localStorage.Authorization },
      })
      .then(response => {
        console.log(response);
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
      <Row>
        {products.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <ProductItem key={product.id} product={product} />
          </Col>
        ))}
      </Row>
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
