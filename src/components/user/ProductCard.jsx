import React from "react";
import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card>
      <Card.Body>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        {product.price && <p>Price: ${product.price}</p>}
        {product.stock && <p>Stock: {product.stock}</p>}
        <Button variant="secondary" as={NavLink} to={`/edit/${product.id}`}>
          Edit Product
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
