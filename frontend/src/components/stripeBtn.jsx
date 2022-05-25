import React, { Fragment, useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearLocalStorageCart } from "../redux/action/Cart";
import { goToHome } from "../redux/action/Cart";

const StripeBtn = (props) => {




  const history = useHistory();


  const clearCart = ()=>{
    console.log(props.mergedObject)
    let res2 =  axios({
      method: "post",
      url: "http://localhost:8080/cart/buy",
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      data: props.mergedObject,
      
    }).then((res) => {
      console.log("ORDER DONE")
     
    });
  


    history.push("/");

       window.location.reload()

  }


  const dispatch = useDispatch();

  const publishableKey =
    "pk_test_51KYAh7Fnja0F2DGHDY9fsDRS2ImeHhegy4pNuepcHaWjfXkPfePwmjl4e0LAOoIxPwKuNr6R1C6L61MtUkmhnkz000CQ1uElz2";

  const onToken = (token) => {
    
    const body = {
      amount: props.total * 100,
      token: token,
    };
    console.log(body)

    axios
      .post("http://localhost:8080/payment", body)
      .then((response) => {
       // console.log(response);
       // dispatch(clearLocalStorageCart());

        //localStorage.removeItem('persist:root');
        //dispatch(goToHome())
        window.location.reload()
      clearCart()
      })
      .catch((error) => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };

  return (
    
    <div>
      <StripeCheckout
        label={`confirm with paying ${props.total}E£ with credit card`} //Component button text
        name="Pay with Card" 
        // description="modal description"
        panelLabel="pay" //Submit button in modal
        amount={props.total * 100} //Amount in cents $9.99
        token={onToken}
        stripeKey={publishableKey}
        billingAddress={false}
      />
    </div>
  );
};
export default StripeBtn;
