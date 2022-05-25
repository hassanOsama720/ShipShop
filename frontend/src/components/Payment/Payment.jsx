import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { goToHome } from "../redux/action/Cart";
import "./Payment.css";
const PaymentScreen = ({ history }) => {
  const state = useSelector((state) => state.handleCart);
  var visa = false;
  var totalPrice = 0;
  for (let i = 0; i < state.length; i++) {
    totalPrice += state[i].qty * state[i].price;
  }
  if (totalPrice >= 20000) {
    visa = true;
  }
  window.scrollTo(0, 0);

  const [paymentMethod, setPaymentMethod] = useState("card");

  const dispatch = useDispatch();
  if (state.length === 0) {
    history.push("/");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    history.push("/placeorder");
  };
  return (
    <>
      <div className="form">
        <form className="insideForm" onSubmit={submitHandler}>
          <h6>select payment method</h6>
          <div
            style={{ width: "500px" }}
            className="inputContainer payment-container"
          >
            <label>
              <input
                type="radio"
                value="card"
                name="gender"
                checked="true"
                onChange={() => setPaymentMethod("card")}
              />
              <span className="design"></span>
              <span className="text"> pay with credit card </span>
            </label>
            {/* pay with credit card <br></br> */}
            <label>
              <input
                type="radio"
                value="cod"
                name="gender"
                disabled={visa}
                onPointerEnter={()=>console.log("X")}
                onChange={() => setPaymentMethod("cod")}
              />
              <span className="design"></span>
              <span className="text"> cash on delievery</span>
            </label>
            {/* cash on delievery{" "} */}
            {visa && 
            <div class="alert alert-danger" role="alert">
           "SORRY , CASH ON DELIVERY LIMIT IS 20K"</div>}
            {/* <p className="hint">{visa && "(SORRY , CASH ON DELIVERY LIMIT IS 20K)"}</p> */}
            {/* <br></br> */}
          </div>
          <NavLink
            className="btn  "
            to={{
              pathname: "/checkout",
              state: { paymentMethod: paymentMethod },
            }}
          >
            Continue
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
