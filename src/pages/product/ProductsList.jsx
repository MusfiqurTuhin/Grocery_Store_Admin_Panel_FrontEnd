import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { List } from 'react-content-loader';
import Layout from '../../components/layout/Layout';
import ProductCard from '../../components/user/ProductCard';
import * as productService from '../../services/product.service';

const ProductsList = () => {
  const [products, setProducts] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const products = await productService.retrieveAllProducts();
      setProducts(products);
    } catch (error) {
      const retrieveErrorMessage = () => {
        const apiErrorMessage = error?.response?.data?.message;
        return apiErrorMessage ?? 'Error while connecting to the server';
      };
      setErrorMessage(retrieveErrorMessage());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <div className='text-center'>
          <List />
        </div>
      ) : errorMessage ? (
        <h3 className='text-center text-danger fw-bold'>{errorMessage}</h3>
      ) : (
        <>
          <h4 className='text-center mb-3'>Products</h4>
          <Row className='justify-content-center'>
            {Object.values(products).map((product) => (
              <Col key={product.id} lg={4} className='p-1'>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Layout>
  );
};

export default ProductsList;
