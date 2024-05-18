import React from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import * as productService from "../../services/product.service";

const RemoveProduct = () => {
  const DELAY_BEFORE_REDIRECTION_MS = 1000; // 1 second

  const { productId } = useParams();

  const submitAction = async () => {
    try {
      const response = await productService.removeProduct(productId);

      if (response?.status) {
        toast.success("Product has been removed.");
      } else {
        toast.warn(`Product couldn't be removed.`);
      }

      setTimeout(() => {
        window.location.href = "/";
      }, DELAY_BEFORE_REDIRECTION_MS);
    } catch (error) {
      toast.error(`Product cannot be removed.`);
      console.error(error.message);
    }
  };

  const cancelAction = () => {
    window.location.href = "/";
  };

  return (
    <Layout>
      <h4 className="text-center">Are you sure to remove product #{productId}?</h4>
      <Row className="justify-content-center">
        <Col md={4}>
          <Form className="mt-4">
            <Button variant="danger" onClick={submitAction} className="m-1">
              Yes, remove this product
            </Button>

            <Button variant="secondary" onClick={cancelAction} className="m-1">
              No, revert my action
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default RemoveProduct;
