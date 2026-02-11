import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products = [],
    loading,
    error,
    resultPerPage,
    productsCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  // Pagination handler
  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Price slider handler (RESET PAGE)
  const priceHandler = (event, newPrice) => {
    setCurrentPage(1);
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    // 🔥 CLEAN API CALL (NO BAD PARAMS)
    dispatch(
      getProduct(
        keyword || "",
        currentPage,
        price,
        category,
        ratings
      )
    );
  }, [dispatch, keyword, error, currentPage, price, category, ratings]);

  // ✅ Correct count logic
  const count = filteredProductsCount || productsCount;
console.log("keyword:", keyword, "category:", category);


  return (
    <Fragment>
      <MetaData title="PRODUCTS -- ECOMMERCE" />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="noProducts">No Products Found</p>
            )}
          </div>

          {/* FILTER BOX */}
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((cat) => (
                <li
                  className="category-link"
                  key={cat}
                  onClick={() => {
                    setCurrentPage(1);
                    setCategory(cat);
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          

          {/* PAGINATION */}
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={count}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
