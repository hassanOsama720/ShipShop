import { useState, useEffect, React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {
  addCart,
  delCart,
  zeroCart,
  addWishlist,
  delWishlist,
  zeroWishlist,
  addCartFirst,
} from "../redux/action";
import axios from "axios";
import StripeBtn from "./stripeBtn";

const Cart = () => {
  let history = useHistory();

  const [price, setPrice] = useState({
    p: 0,
  });

  const state = useSelector((state) => state.handleWishlist);

  const dispatch = useDispatch();

  const handleZero = (item) => {
    dispatch(zeroWishlist(item));
  };

  const addProduct = (product) => {
    if (product.length === 0) return;
    dispatch(addCartFirst(product));
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-0">
        <div className="container min-vh-100">
          <div className="alert alert-info text-center mt-3">
            <h3>Your Wishlist is Empty</h3>
            <NavLink
              to="/products"
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              SHOPPING NOW
            </NavLink>
          </div>
        </div>
      </div>
    );
  };
  const cartItems = (product) => {
    return (
      <>
        <div  className="px-4 my-0 bg-light rounded-3 py-2 border-bottom min-vh-50" >
          <div  className="container py-4">
            <button
              onClick={() => handleZero(product)}
              className="btn-close float-end"
              aria-label="Close"
            ></button>
            <div          style={{cursor:"pointer"}}
            onClick={()=>history.push(`product/${product._id}`)} class="row g-0">
              <div class="col-md-4">
                <img
                  src={product.images}
                  class="img-fluid rounded-start my-3 mx-3"
                  height="200px"
                  width="180px"
                  alt={product.name}
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title text-danger fw-bold">{product.name}</h5>
                  <p class="card-text">
                    <p>description :</p> {product.description}
                  </p>
                  <p class="card-text fw-bold">brand : {product.brand}</p>
                  <p class="card-text fw-bold">Price : {product.price} E£</p>
                  {/* {
                    product.quantity>0&&
                  <button
                    className="btn btn-outline-success  col-lg col-md"
                    onClick={() => addProduct(product)}
                  >
                    Add To Cart
                  </button>}

                  {
                    product.quantity<=0&&
                  <div>
                  out of stock
                  </div>} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  // const buttons = () => {
  //   return (
  //     <>
  //       <div className="container">
  //         <hr />
  //         <div className="row justify-content-center">
  //         <NavLink
  //             to="/products"
  //             className="btn btn-outline-dark mb-5 w-25 mx-auto "
  //           >
  //             Continue To Shopping
  //           </NavLink>
  //           <NavLink
  //             to="/shipping"
  //             className="btn btn-outline-dark mb-5 w-25 mx-auto "
  //           >
  //             Proceed to Checkout
  //           </NavLink>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <div>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}
      {/* {state.length !== 0 && buttons()} */}
    </div>
  );
};

export default Cart;
