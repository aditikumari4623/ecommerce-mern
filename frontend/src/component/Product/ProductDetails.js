import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProductDetails,
  clearErrors,
  newReview,
} from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import ReviewCard from "./ReviewCard";
import MetaData from "../layout/MetaData";
import Rating from "@mui/material/Rating";
import { addItemsToCart } from "../../actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const [quantity, setQuantity] = useState(1);

  // Review states
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { product = {}, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
      
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch(getProductDetails(id));
    setOpen(false);
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, reviewError, success, id]);

  const stock = Number(product.Stock || 0);

  // Quantity handlers
  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Add to cart
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };

  // Review Dialog toggle
  const submitReviewToggle = () => {
    setOpen(!open);
  };

  // Submit review
  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    

    setOpen(false);
    setRating(0);
    setComment("");
  };

  if (loading) return <Loader />;

  return (
    <Fragment>
      <MetaData title={`${product.name} -- ECOMMERCE`} />

      <div className="ProductDetails">
        {/* Product Images */}
        <div>
          {product.images &&
            product.images.map((item, i) => (
              <img
                key={i}
                className="CarouselImage"
                src={
                  item.url && item.url !== "sampleUrl"
                    ? item.url
                    : "/placeholder.png"
                }
                alt="Product"
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />
            ))}
        </div>

        {/* Product Info */}
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>

          <div className="detailsBlock-2">
            <Rating
              value={product.ratings || 0}
              readOnly
              precision={0.5}
              size="large"
            />
            <span> ({product.numOfReviews} Reviews)</span>
          </div>

          <div className="detailsBlock-3">
            <h1>₹{product.price}</h1>

            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button type="button" onClick={decreaseQuantity}>
                  -
                </button>

                <input readOnly type="number" value={quantity} />

                <button type="button" onClick={increaseQuantity}>
                  +
                </button>
              </div>

              <button
                disabled={stock < 1}
                onClick={addToCartHandler}
              >
                Add To Cart
              </button>
            </div>

            <p>
              Status:
              <b className={stock < 1 ? "redColor" : "greenColor"}>
                {stock < 1 ? " Out of Stock" : ` In Stock (${stock})`}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description:
            <p>{product.description}</p>
          </div>

          {/* SUBMIT REVIEW BUTTON (this was missing before) */}
          <button onClick={submitReviewToggle} className="submitReview">
            Submit Review
          </button>
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={open} onClose={submitReviewToggle}>
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e, value) => setRating(value)}
            value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <h3 className="reviewsHeading">REVIEWS</h3>

      {product.reviews && product.reviews.length > 0 ? (
        <div className="reviews">
          {product.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </Fragment>
  );
};

export default ProductDetails;
