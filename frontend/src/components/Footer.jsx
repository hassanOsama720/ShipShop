import React from "react";
import { Link,NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer text-center text-lg-start text-white">
        <section
    className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
  >
    <div className="me-5 d-none d-lg-block">
      <h6>Get connected with us on social networks:</h6>
    </div>

    <div>
      <Link to="" className="me-4 text-reset">
        <i className="fab fa-facebook-f fa-2x"></i>
      </Link>
      <Link to="" className="me-4 text-reset">
        <i className="fab fa-twitter fa-2x"></i>
      </Link>
      <Link to="" className="me-4 text-reset">
        <i className="fab fa-google fa-2x"></i>
      </Link>
      <Link to="" className="me-4 text-reset">
        <i className="fab fa-instagram fa-2x"></i>
      </Link>
      <Link to="" className="me-4 text-reset">
        <i className="fab fa-linkedin fa-2x"></i>
      </Link>
      <Link to="" className="me-4 text-reset">
        <i className="fab fa-github fa-2x"></i>
      </Link>
    </div>
  </section>

  <section className="">
    <div className="container text-center text-md-start mt-5">
      <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
          <i className="fas fa-shopping-cart fa-1x"></i> ShipShop           
          </h6>
          <p>
          ShipShop.com is a vast Internet-based enterprise that sells almost everything, like books, Mobiles, Fashion, Electronics, and many other goods, either directly or as the middleman between other retailers and ShipShop.com millions of customers.
          </p>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold mb-4">
            Products
          </h6>                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <NavLink to="/" className="nav-link p-0 text-white">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="/products" className="nav-link p-0 text-white">
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="/about" className="nav-link p-0 text-white">
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="/contact" className="nav-link p-0 text-white">
                      Contact
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="/FAQs" className="nav-link p-0 text-white">
                    FAQs
                    </NavLink>
                  </li>
                </ul>
         
        </div>
{/* <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold mb-4">
           Team 
          </h6> 
                         <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <NavLink to="contact" className="nav-link p-0 text-white">
                      Abdelrhman Zaki
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="/contact" className="nav-link p-0 text-white">
                      Ahmed Elmanzlawy
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="/contact" className="nav-link p-0 text-white">
                      Ahmed Kamal
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="/contact" className="nav-link p-0 text-white">
                      Adel Elfar
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="/contact" className="nav-link p-0 text-white">
                    Hassan Osama
                    </NavLink>
                  </li>
                   <li className="nav-item mb-2">
                    <NavLink to="/contact" className="nav-link p-0 text-white">
                    Reem Abdelhamid
                    </NavLink>
                  </li>
                </ul>
         
        </div> */}


        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Contact
          </h6>
          <p><i className="fas fa-home me-3"></i> Egypt, Mansoura,35111</p>
          <p>
            <i className="fas fa-envelope me-3"></i>
            shipshopservies@gmail.com
          </p>
          <p><i className="fas fa-phone me-3"></i> + 01 554293937</p>
          <p><i className="fas fa-print me-3"></i> + 01 554293937</p>
        </div>
      </div>
    </div>
  </section>

  <div className="d-flex justify-content-center pt-4 mt-4 border-top px-3 text-center">
              <p>© 2022 , Inc. All rights reserved, ITI-ShipShop-Team</p>
              
            </div>
            </footer>
     
  );
};

export default Footer;
