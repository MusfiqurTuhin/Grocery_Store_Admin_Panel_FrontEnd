import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import * as productService from "../../services/product.service";

const RetrieveProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const product = await productService.retrieveProduct(productId);
      setProduct(product);
    } catch (err) {
      setProduct(null);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return (
    <Layout>
      {product ? (
        <Row className="justify-content-center">
          <Col lg={5}>
            <h3 className="text-center mb-3">{product.name}</h3>
            <Card>
              <Card.Body className="text-center">
                <p>{product.description}</p>
                {product.price && (
                  <p>Price: ${product.price}</p>
                )}
                {product.stock && (
                  <p>Stock: {product.stock}</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p className="text-center text-danger fw-bold">Product cannot be found.</p>
      )}
    </Layout>
  );
};

export default RetrieveProduct;
