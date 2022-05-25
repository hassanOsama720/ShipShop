import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "../../gov.json";
import { Formik, Form, Field } from "formik";
import "./styles.css";

import "bootstrap/dist/css/bootstrap.css";
import { saveShippingAddress } from "../../redux/action/Cart";
import { PersistFormikValues } from "formik-persist-values";
const ShippingScreen = ({ history }) => {
  const state = useSelector((state) => state.handleCart);
  var govs = data[2].data.map((value) => value.governorate_name_en);

  const LOCAL_STORAGE_KEY = "form";
  const [options, setOptions] = useState(govs);

  if (state.length === 0) {
    history.push("/");
  }
  window.scrollTo(0, 0);
  /*
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
*/
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(saveShippingAddress({ address, city, country }));
    history.push("/payment");
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center login-center min-vh-100">
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            if (
              !values.Governorate ||
              !values.appartment ||
              !values.street ||
              !values.phone ||
              !values.city ||
              values.Governorate === "Select Your Governorate"
            ) {
              return;
            }
            dispatch(saveShippingAddress(values));
            //dispatch(saveShippingAddress({ address, city, postalCode, country }));

            console.log(values);
            if (
              values.Governorate !== "" &&
              values.Governorate !== "Select Your Governorate" &&
              values.appartment !== "" &&
              values.street !== "" &&
              values.phone !== "" &&
              values.city !== ""
            )
              history.push("/payment");
          }}
        >
          {(props) => (
            <div className="formLogin">
              <div className="col-sm-12 ">
                <h3>Client Address</h3>
              </div>
              <div className="">
                <Form>
                  <div className="form-group ">
                    <label htmlFor="Governorate" className="mt-3"></label>

                    <Field
                      className="form-control selectBox"
                      name="Governorate"
                    >
                      {({ field }) => (
                        <select className="select" {...field}>
                          <option>Select Your Governorate</option>
                          {/* <option value=""></option> */}
                          {govs.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city" className=""></label>
                    <Field
                      className="form-control input"
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="appartment"></label>
                    <Field
                      className="form-control  input"
                      type="text"
                      name="appartment"
                      placeholder="Enter appartment"
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="street" className=""></label>
                    <Field
                      className="form-control input"
                      type="text"
                      name="street"
                      placeholder="Enter street"
                      minLength={5}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className=""></label>
                    <Field
                      type="text"
                      className="form-control input"
                      pattern="^01[0-2]\d{1,8}$"
                      maxLength={11}
                      minLength={11}
                      name="phone"
                      placeholder="Enter phone"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    onSubmit={submitHandler}
                    className=" btn btn-primary my-3 px-3"
                  >
                    Submit
                  </button>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ShippingScreen;
