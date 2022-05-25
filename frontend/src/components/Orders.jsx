import React from "react";
import "../App.css";
//Bootstrap htmlFor responsiveness
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
//import moment from 'moment'

const Orders = (props) => {
  const { id } = useParams();

  const cartState = useSelector((state) => state.handleCart);
  const orderState = useSelector((state) => state.handleOrders);
  var orderStatus;
  var orderDate,expectedDate

  var infoz = [];
  var res;
  for (let i = 0; i < orderState.length; i++) {
    if (orderState[i]._id && id === orderState[i]._id) {
      orderStatus = orderState[i].orderStatus;
      orderDate = orderState[i].createdAt;
      var locale = new Date(orderDate)

    let date = new Date(locale)
    let result=new Date()
    result.setDate(date.getDate() + 3)
     expectedDate=(result.toLocaleString().split(',')[0])
    }
  }
  var packed = "step",
    shipped = "step",
    delivered = "step",
    pending = "step",
    cancelled = "step";

  if (orderStatus === "pending") {
    pending = "step completed";
  } else if (orderStatus === "packed") {
    packed = "step completed";
    pending = "step completed";
  } else if (orderStatus === "shipped") {
    packed = "step completed";
    pending = "step completed";
    shipped = "step completed";
  } else if (orderStatus === "delivered") {
    packed = "step completed";
    pending = "step completed";
    shipped = "step completed";
    delivered = "step completed";
  } else if (orderStatus === "cancelled") {
    packed = "step completed";
    pending = "step completed";
    shipped = "step completed";
    delivered = "step completed";
    cancelled = "step completed";
  }
  console.log("orderStatus", orderStatus);
  return (
    <div className="main_container min-vh-100 py-5">
      <div className="container padding-bottom-3x mb-1">
        <div className="card mb-3">
  
          <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
            <div className="w-100 text-center py-1 px-2">
              <span className="text-medium">Shipped Via:</span> DHL
            </div>
            <div className="w-100 text-center py-1 px-2">
              <span className="text-medium">Status:</span> {orderStatus}
            </div>
            <div className="w-100 text-center py-1 px-2">
              <span className="text-medium">Expected Date:</span>{ expectedDate  }

            </div>
          </div>
          <div className="card-body">
            <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
              <div className="step completed">
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <i className="pe-7s-cart"></i>
                  </div>
                </div>
                <h4 className="step-title">Confirmed Order</h4>
              </div>
              <div className={pending}>
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <i className="pe-7s-config"></i>
                  </div>
                </div>
                <h4 className="step-title">Processing Order</h4>
              </div>
              <div className={packed}>
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <i className="pe-7s-shopbag"></i>
                  </div>
                </div>
                <h4 className="step-title">Packing</h4>
              </div>
              <div className={shipped}>
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <i className="pe-7s-car"></i>
                  </div>
                </div>
                <h4 className="step-title">Product Dispatched</h4>
              </div>
              <div className={delivered}>
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <i className="pe-7s-home"></i>
                  </div>
                </div>
                <h4 className="step-title">Product Delivered</h4>
              </div>

              {cancelled !== "step" && (
                <div  className={cancelled}>
                  <div  className="step-icon-wrap">
                    <div style={{backgroundColor:"red"}} className="step-icon">
                      <i className="pe-7s-close"></i>
                    </div>
                  </div>
                  <h4 className="step-title">order cancelled</h4>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
          {/* <div className="custom-control custom-checkbox mr-3">
            <input
              className="custom-control-input"
              type="checkbox"
              id="notify_me"
              checked=""
            />
            <label className="custom-control-label" htmlFor="notify_me">
              Notify me when order is delivered
            </label>
          </div> */}
          <div className="text-left text-sm-right">
            <BrowserRouter basename="/calendar" />
            <NavLink
              to={`../order-details/${id}`}
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              view order details
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
