import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const ProductCard = ({ product }) => {
  if (!product || !product._id) return null;

  const options = {
    value: product.ratings || 0,
    readOnly: true,
    precision: 0.5,
  };

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "/Profile.png";

  return (
    <Link
      className="productCard"
      to={`/product/${product._id}`}   // ✅ FIXED
      onClick={(e) => {
        if (!product._id) e.preventDefault();
      }}
    >
      <img src={imageUrl} alt={product.name || "Product"} />
      <p>{product.name}</p>

      <div>
        <Rating {...options} />
        <span className="productCardSpan">
          ({product.numOfReviews || 0} Reviews)
        </span>
      </div>

      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
