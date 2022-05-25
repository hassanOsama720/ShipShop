import { useState, useEffect, React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addCart, delCart, zeroCart,addWishlist,delWishlist,zeroWishlist } from "../redux/action";
import axios from "axios";
import StripeBtn from "./stripeBtn";

const Cart = () => {
  const [price, setPrice] = useState({
    p: 0,
  });


  const state = useSelector((state) => state.handleCart);

  const dispatch = useDispatch();

  const handleAdd = (item) => {
    console.log("HANDLE ADD")
    if (item.quantity > item.qty) dispatch(addCart(item));
    price.p += item.price;

  };
  const handleDel = (item) => {
    dispatch(delCart(item));
    if (item.qty > 1) price.p -= item.price;
  };

  const handleZero = (item) => {
    dispatch(zeroCart(item));
    price.p -= item.price * item.qty;
  };

  

  


  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-0">
        <div className="container min-vh-100">
          <div className="alert alert-info text-center mt-3">
            <h3>Your Cart is Empty</h3>
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
        <div className="px-4 my-5 bg-light rounded-3 py-5">
          <div className="container py-4">
            <button
              onClick={() => handleZero(product)}
              className="btn-close float-end"
              aria-label="Close"
            ></button>
            <div className="row justify-content-center">
              <div className="col-md-4">
                <img
                  src={product.images}
                  alt={product.name}
                  height="200px"
                  width="180px"
                />
              </div>
              <div className="col-md-4">
                <h3>{product.name}</h3>
                <hr />
                <h5>Price : {product.price} E£</h5>
                <h5>Quantity : {product.qty}</h5>

                <p className="lead fw-bold hide">
                  {product.qty} X ${product.price} = E£
                  {product.qty * product.price}
                </p>
                <br />
                <button
                  className="btn btn-outline-danger me-4"
                  onClick={() => handleDel(product)}
                >
                  <i className="fa fa-minus"></i>
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => {
                    handleAdd(product);
                  }}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const buttons = () => {
    return (
      <>
        <div className="container">
          <hr />
          <div className="row justify-content-center">
          <NavLink
              to="/products"
              className="btn btn-outline-dark mb-5 w-25 mx-auto "
            >
              Continue To Shopping
            </NavLink>
            <NavLink
              to="/shipping"
              className="btn btn-outline-dark mb-5 w-25 mx-auto "
            >
              Proceed to Checkout
            </NavLink>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}
      {state.length !== 0 && buttons()}
    </div>
  );
};

export default Cart;
