import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Products from "./pages/Products/Products";
import Product from "./components/Product";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./pages/NotFound";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "../src/pages/Login/Login";
import Payment from "../src/components/Payment/Payment";
import Shipping from "../src/components/shipping/Shipping";
import Orders from "./components/Orders";
import { Offline, Online } from "react-detect-offline";
import ForgotPassword from "./pages/Login/ForgotPassword";
import ActivationEmail from "./pages/Login/ActivationEmail";
import Register from "../src/pages/register/register";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRouter from "./PrivateRouter";
import Wishlist from "./components/Wishlist"
import {
  addCart,
  delCart,
  zeroCart,
  addCartFromDB,
  addWishlistFromDB,
  addOrdersFromDB,
} from "./redux/action";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "./pages/userProfile/UserProfile";
import axios from "axios";
import Footer from "./components/Footer";
import FAQs from "./pages/FAQs";
import OrderDetails from "./components/OrderDetails";
import NoInternet from "./pages/NoInternet";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.handleCart);
  const orderState = useSelector((state) => state.handleOrders);

  useEffect(() => {
    let res2 = axios({
      method: "get",
      url: "http://localhost:8080/cart",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        console.log("RES", res);
        for (let i = 0; i < res.data.length; i++) {
          dispatch(addCartFromDB(res.data[i]));
        }
      })
      .catch((er) => {
        console.log("ER", er);
      });
    console.log(res2);



    let res5 = axios({
      method: "get",
      url: "http://localhost:8080/wishlist",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        console.log("RES", res);
        for (let i = 0; i < res.data.length; i++) {
          dispatch(addWishlistFromDB(res.data[i]));
        }
      })
      .catch((er) => {
        console.log("ER", er);
      });
      
    console.log(res2);
    let res3 = axios({
      method: "get",
      url: `http://localhost:8080/orders/customer/${localStorage.getItem(
        "_id"
      )}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: { role: localStorage.getItem("role") },
    }).then((res) => {
      console.log("orders", res);
      for (let i = 0; i < res.data.length; i++) {
        dispatch(addOrdersFromDB(res.data[i]));
      }
    });
  }, []);

  return (
    <>

    <Offline>
            <Route component={NoInternet} />

    </Offline>
    <Online>
    
    

      <Navbar />
      <Switch>
        <PrivateRouter exact path={"/profile"} component={UserProfile} />
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/about" component={About} />
        <PrivateRouter exact path="/checkout" component={Checkout} />
        <Route exact path="/contact" component={Contact} />
        <PrivateRouter exact path="/cart" component={Cart} />
        <PrivateRouter exact path="/shipping" component={Shipping} />
        <PrivateRouter exact path="/forgotPassword" component={ForgotPassword}/>
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
        <PrivateRouter path={"/payment"} component={Payment} />
        <Route path={"/FAQs"} component={FAQs} />
        <PrivateRouter path={"/orders/:id"} component={Orders}/>
        <PrivateRouter path={"/order-details/:id"} component={OrderDetails}/>
        <PrivateRouter path={"/wishlist"} component={Wishlist} />
        <Route path={"*"} component={NotFound} />
      </Switch>
      <Footer />
      </Online>
    </>
  );
}
export default App;
