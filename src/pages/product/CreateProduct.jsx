import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";
import { firstUpperCase } from "../../helpers/string.helper";
import * as productService from "../../services/product.service";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();

    const createProductPayload = {
      name,
      description,
      price,
      category,
      stock,
      image,
    };

    try {
      const response = await productService.createProduct(createProductPayload);

      if (response?.status) {
        const productName = response?.product?.name;

        toast.success(`Product ${productName} has been created!`);

        // Clear states
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setStock("");
        setImage("");
      } else {
        toast.warn("An error has occurred.");
      }
    } catch (error) {
      const getErrorMessage = () => {
        const {
          data: {
            errors: { body },
          },
        } = error.response;

        const message = body[0]?.message;

        // Uppercase the first letter of the message
        return firstUpperCase(message);
      };

      toast.error(getErrorMessage());
    }
  };

  return (
    <Layout>
      <Row className="justify-content-center">
        <Col lg={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                onChange={(fieldElement) => setName(fieldElement.target.value)}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                onChange={(fieldElement) => setDescription(fieldElement.target.value)}
                value={description}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                onChange={(fieldElement) => setPrice(fieldElement.target.value)}
                value={price}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                onChange={(fieldElement) => setCategory(fieldElement.target.value)}
                value={category}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Stock Quantity"
                onChange={(fieldElement) => setStock(fieldElement.target.value)}
                value={stock}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image URL"
                onChange={(fieldElement) => setImage(fieldElement.target.value)}
                value={image}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={submitForm}>
              Add Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default CreateProduct;
