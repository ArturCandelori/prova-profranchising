import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Pagination } from 'react-bootstrap';

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
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(err => console.log(err));
  }, [itemsPerPage, pageNumber, products]);

  return (
    <>
      <h2>Lista de produtos</h2>
      <div className='my-3'>
        <label htmlFor='teste'>Itens por página:</label>

        <select
          name='numberOfPages'
          id='teste'
          onSelect={e => setItemsPerPage(e.target.value)}
        >
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
        </select>
      </div>
      <Row>
        {products.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
      <Pagination>
        {[...Array(totalPages).keys()].map(index => (
          <Pagination.Item key={index} onClick={() => setPageNumber(index)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default ProductList;
