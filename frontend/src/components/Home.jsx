import React, { Component } from "react";
import Slider from "react-slick";
import CategoryCard from "./CategoryCard";
import Carousel from "react-bootstrap/Carousel";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { addCart } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCategoriesList, getProductsList } from "../redux/action/Products";
import axios from "axios";
import Products_Card from "./Products_Card";
import PasswordButton from "./PasswordButton";
const Home = () => {

  const settings = {
      infinite: true,
      slidesToShow: 4.5,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const settingsTwo = {
      infinite: true,
      slidesToShow: 4.5,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1500,
      autoplaySpeed: 3500,
      cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const cartState = useSelector((state) => state.handleCart);
  const CategoriesList = useSelector(
    (state) => state.ProductsReducer.categories
  );
  const dispatch = useDispatch();

  const [randomproducts, setRandomProducts] = useState([]);
  const products = useSelector((state) => state.ProductsReducer.list);
  useEffect(() => {
    dispatch(getCategoriesList());
    axios
      .get(`http://localhost:8080/random`)
      .then((res) => {
        setRandomProducts(res.data.data);
      })
      .catch((err) => console.log(err));
    console.log(randomproducts);
    dispatch(getProductsList(''));
  }, []);
  return (
    <div className="hero  bg-secondary p-2  bg-opacity-10">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/promocode.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h4>NEW SEASON ARRIVALS</h4>
            <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
            <NavLink
              to="/products"
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              Shop Now
            </NavLink>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h4>NEW SEASON ARRIVALS</h4>
            <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
            <NavLink
              to="/products"
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              Shop Now
            </NavLink>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/3.jpg"
            alt="third slide"
          />
          <Carousel.Caption>
            <h4>NEW SEASON ARRIVALS</h4>
            <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
            <NavLink
              to="/products"
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              Shop Now
            </NavLink>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/4.jpg" alt="four slide" />

          <Carousel.Caption>
            <h4 >NEW SEASON ARRIVALS</h4>
            <p className="card-text  lead fs-2">CHECK OUT ALL THE TRENDS</p>
            <NavLink
              to="/products"
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              Shop Now
            </NavLink>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/8.jpg" alt="five slide" />

          <Carousel.Caption>
            <h4 className="text-black">NEW SEASON ARRIVALS</h4>
            <p className="card-text text-black lead fs-2">CHECK OUT ALL THE TRENDS</p>
            <NavLink
              to="/products"
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              Shop Now
            </NavLink>
          </Carousel.Caption>
        </Carousel.Item>
         <Carousel.Item>
          <img className="d-block w-100" src="/assets/7.jpg" alt="six slide" />

          <Carousel.Caption>
            <h4 className="text-black">NEW SEASON ARRIVALS</h4>
            <p className="card-text text-black lead fs-2">CHECK OUT ALL THE TRENDS</p>
            <NavLink
              to="/products"
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              Shop Now
            </NavLink>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container
        className="d-flex flex-wrap justify-content-around"
        style={{ marginTop: "70px" }}
      >
        <h1 style={{ width: "80%", textAlign: "center", color: "#999" }}>
            Categories
          </h1>
          <span
            style={{
              backgroundColor: "#999",
              height: "2px",
              width: "71%",
              marginBottom: "50px",
            }}
          ></span>
        {CategoriesList.map((category) => {
          return <CategoryCard category={category}></CategoryCard>;
        })}
      </Container>
      <Container
        fluid="true"
        className="d-flex flex-wrap justify-content-around"
        style={{
          marginTop: "70px",
          backgroundColor: "#F7F7F7",
          paddingTop: "40px",
        }}
      >
        <div
          style={{ width: "100%" }}
          fluid="true"
          className="d-flex flex-wrap justify-content-center"
        >
          <h1 style={{ width: "80%", textAlign: "center", color: "#999" }}>
            Latest Products
          </h1>
          <span
            style={{
              backgroundColor: "#999",
              height: "2px",
              width: "50%",
              marginBottom: "30px",
            }}
          ></span>
        </div>

        {randomproducts.map((product) => {
          return <Products_Card product={product}></Products_Card>;
        })}
      </Container>

      <div className="  my-4 px-5 container-fluid" style={{height:"550px" ,backgroundColor: "white"}}>
      <h2 className="pt-3">Laptops</h2>
        <Slider {...settings} className="text-black">
          {products.filter((product)=>{
              if(product.category_id === "624ea7bde00092df32b811d0" )
              return true
              else 
              return false

            }).map((product)=>{
              return(
                <div >
                  <Products_Card product={product} >
                
              </Products_Card>
                </div>
              )
            })}
        </Slider>
      </div>

      <div className="my-4 px-5 container-fluid" style={{height:"550px" ,backgroundColor: "white"}}>
      <h2 className="pt-3">Mobile</h2>
        <Slider {...settingsTwo} className="text-black">
          {
            products.filter((product)=>{
              if(product.category_id === "624ea753e00092df32b811ce" )
              return true
              else 
              return false

            }).map((product)=>{
              return(
                <div >
                  <Products_Card product={product} >
                
              </Products_Card>
                </div>
              )
            })
          }
          {/* {product.map((product)=>{
            return(
              <div >
                <Products_Card product={product} >
              
            </Products_Card>
              </div>
            )
          })} */}
        </Slider>
      </div>

      <div className="my-4 px-5 container-fluid" style={{height:"550px" ,backgroundColor: "white"}}>
      <h2 className="pt-3">Electronics</h2>
        <Slider {...settingsTwo} >
          {products.filter((product)=>{
              if(product.category_id === "6250246d807579e0e8e00d17" )
              return true
              else 
              return false

            }).map((product)=>{
              return(
                <div >
                  <Products_Card product={product} >
                
              </Products_Card>
                </div>
              )
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
