import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import { firstUpperCase } from "../../helpers/string.helper";
import * as productService from "../../services/product.service";

const EditProduct = () => {
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const populateProductFields = async () => {
    try {
      const product = await productService.retrieveProduct(productId);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setImage(product.image);
    } catch (err) {
      console.error(err.message);
      window.location.href = "/";
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const payload = {
      name,
      description,
      price,
      category,
      stock,
      image,
    };

    try {
      const response = await productService.editProduct(productId, payload);

      if (response?.status) {
        const productName = response.product.name;
        toast.success(`${productName} has been updated.`);
      } else {
        toast.warn(`The product couldn't be updated.`);
      }
    } catch (error) {
      const retrieveErrorMessage = () => {
        const {
          data: {
            errors: { body },
          },
        } = error.response;
        const errorMessage = body[0]?.message;

        return firstUpperCase(errorMessage);
      };

      toast.error(retrieveErrorMessage());
    }
  };

  useEffect(() => {
    populateProductFields();
  }, [productId]);

  return (
    <Layout>
      <h3 className="text-center">Edit Product</h3>
      <Row className="justify-content-center">
        <Col lg={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(fieldElement) => setName(fieldElement.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(fieldElement) => setDescription(fieldElement.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(fieldElement) => setPrice(fieldElement.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(fieldElement) => setCategory(fieldElement.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                value={stock}
                onChange={(fieldElement) => setStock(fieldElement.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(fieldElement) => setImage(fieldElement.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={submitForm} className="m-1">
              Update
            </Button>

            <Button
              variant="danger"
              as={NavLink}
              to={`/remove/${productId}`}
              className="m-1"
            >
              Remove
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default EditProduct;
