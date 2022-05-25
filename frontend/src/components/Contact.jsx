import axios from "axios";
import React, {useState} from "react";
import  "bootstrap/dist/css/bootstrap.min.css";
import { Alert,AlertTitle } from "@mui/material";
const Contact = () => {

  const [msg, setMsg] = useState({
    name : "",
    email : "",
    phone : "",
    message : ""
  });
  const [popup, setPopup] = useState("");

  // Handle Inputs
  const handleChange = (event) =>{
    let name = event.target.name;
    let value = event.target.value;

    setMsg({...msg, [name]:value});
  }
  // Handle Submit
  const handleSubmit = async (event)=>{
    event.preventDefault();
    axios.post('http://localhost:8080/message',msg)
      .then((res)=>{
        setMsg({
                name : "",
                email : "",
                phone : "",
                message : ""
              })
        setPopup(<>
          <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Thank You For Contacting Us ,Check your Gmail inbox — <strong>Have A Good Day</strong>
          </Alert></>)
        
      })
      .catch((err)=>{
        setPopup(<>
        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        opps! , Message Failed — <strong>One of the required fields is empty or wrong</strong>
        </Alert></>)
      })
  }

  return (
    <div>
      <section id="contact">
        <div className="container my-5 py-0 min-vh-100">
          <div className="row mb-5">
            <div className="col-12">
              <h1 className="display-6 text-center mb-4">
                Have Some Question ?
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
            {popup}
          </div>
          <div className="row">
            <div className="col-md-6">
              <img src="/assets/images/contact.png" alt="Contact" className="w-75" />
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit} method="POST">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your Name"
                    name="name"
                    value={msg.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="contact Email@gmail.com"
                    name="email"
                    value={msg.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="phone"
                    value={msg.phone}
                    onChange={handleChange}
                    pattern="^01[0-2]\d{1,8}$"
                    maxLength={11}
                    minLength={11}
                    placeholder="Enter Valid phone number"
                    required
                  />
                </div>   
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">
                    Your Message
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    name="message"
                    placeholder="Tell us your message or your question here ?"
                    value={msg.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-outline-primary rounded-pill px-4">Send Message <i className="fa fa-paper-plane ms-2"></i></button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;



