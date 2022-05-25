import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartFirst, zeroCart,addWishlistFirst ,zeroWishlist} from "../redux/action";

import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {
  Rating,
  Card,
  CardContent,
  Typography,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";

import axios from "axios";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";

const Product = () => {
  const notifyInfo = (message) => toast.info(message);
  const notifySuccess = (message) => toast.success(message);
  const orderState = useSelector((state) => state.handleOrders);
  const cartList = useSelector((state) => state.handleCart);
  const wishList = useSelector((state) => state.handleWishlist);

  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [popup, setPopup] = useState("");
  const [carted, setcarted] = useState("Add to Cart");
  const [wishListed, setWishListed] = useState("Add to Wishlist");

  const [reviewForm, setReviewForm] = useState("d-none");

  useEffect(() => {



    axios.get(`http://localhost:8080/product/${id}`).then((res) => {
      setProduct(res.data.data[0]);
      setReviews(res.data.data[0].reviews);

      for (let index = 0; index < cartList.length; index++) {
        if (cartList[index]._id ===res.data.data[0]._id) {
          setcarted("Remove From Cart");
  
          
          break;
        }
      }



      for (let index = 0; index < wishList.length; index++) {
        if (wishList[index]._id ===res.data.data[0]._id) {
          setWishListed("Remove From Wishlist");
  
          
          break;
        }
      }
    });

 }, [cartList]);

  let newReview = {
    title: "",
    description: "",
    userID: "",
    rating: "",
    user: "",
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();

  const addProduct = (product) => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
      return;
    }
    
    if (product.length === 0) return;
    
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i]._id === product._id) {
        dispatch(zeroCart(product));
        setcarted("Add to Cart");
        break;
      }
    }

    if (carted === "Add to Cart") {
      dispatch(addCartFirst(product));
      setcarted("Remove From Cart");
    }

  };

  const addProductWishlist = (product) => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
      return;
    }
    
    if (product.length === 0) return;
    
    for (let i = 0; i < wishList.length; i++) {
      if (wishList[i]._id === product._id) {
        dispatch(zeroWishlist(product));
        setWishListed("Add to Wishlist");
        break;
      }
    }

    if (wishListed === "Add to Wishlist") {
      dispatch(addWishlistFirst(product));
      setWishListed("Remove From Wishlist");
    }
  };
  //changes

  function addToWishList() {
    console.log("button");
    var images = product.images;
    var description = product.description;
    var name = product.name;
    var id = product._id;

    var pro = { images, description, name, id };
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (!wishlist) {
      wishlist = [];
    }

    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // localStorage.setItem("wishlist",JSON.stringify( {x,obj} ))
  }
  function sendReview() {
    if (localStorage.getItem("accessToken") === null) {
      setPopup(
        <>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            opps! , Review Failed —{" "}
            <strong>You should login to add review</strong>
          </Alert>
          <NavLink
            style={{ width: "25%" }}
            to="/login"
            className="btn btn-dark ms-2 px-3 py-2"
          >
            Login now
          </NavLink>
        </>
      );
    } else {
      newReview.userID = localStorage.getItem("_id");
      newReview.user = localStorage.getItem("name");
      axios({
        method: "put",
        url: "http://localhost:8080/review",

        data: {
          id: product._id,
          new_review: newReview,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
        .then((response) => {
          setPopup(
            <>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Thank You For your Review — <strong>Have a Good Day</strong>
              </Alert>
            </>
          );
        })
        .catch((error) => {
          setPopup(
            <>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                opps! , Review Failed —{" "}
                <strong>One of the required fields is empty or wrong</strong>
              </Alert>
            </>
          );
        });
    }
  }
  function showAddReview() {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");

      return;
    }
    let cantReview = true;

    for (let i = 0; i < orderState.length; i++) {
      if (orderState[i].shippingAddress && orderState[i].orderItems) {
        for (let j = 0; j < orderState[i].orderItems.length; j++) {
          if (orderState[i].orderItems[j]._id === product._id) {
            console.log("Can review");
            cantReview = false;
          }
        }
      }
    }
    if (cantReview) {
      notifyInfo("You must buy the product first to Add Review");
      // alert(" you cant add review,you must buy the produc first ! ");
    } else
      setReviewForm("d-flex flex-column flex-wrap justify-content-between");
  }
  function closeAddReview() {
    setReviewForm("d-none");
  }
  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <ToastContainer />
        <div className="col-lg col-md col-sm mx-4">
          <img
            src={product.images}
            alt={product.name}
            height="400px"
            width="400px"
            // style={{border :" 1px solid black"}}
            className="py-3 px-3"
          />
        </div>
        <div className="col-lg col-md col-sm mx-4">
          <h5 className="text-uppercase text-black fw-bold display-6">
            {product.name}
          </h5>
          <h4 className="lead fw-normal">
            <p className="fw-bold ">DESC :</p> {product.description}
          </h4>
          <h4 className=" fw-bold my-4 text-danger ">
            Price : {product.price} E£{" "}
          </h4>
          <Rating name="read-only" value={product.rating} readOnly />
          <br />
          <div style={{ display: "flex" }}>
            <button
              className="btn btn-outline-danger  mx-1 px-3 my-1 col-lgcol-md"
              onClick={() => addProductWishlist(product)}
            >
              <i class="fas fa-heart"></i> {wishListed}
            </button>
            {product.quantity <= 0 && (
              <div style={{ cursor: "pointer" }}>
                <button
                  disabled
                  className="btn btn-secondary  mx-1 px-3 my-1 col-lgcol-md"
                >
                  OUT OF STOCK
                </button>
              </div>
            )}
          </div>

          <hr />
          <div className="d-grid gap-1 d-md-block my-4">
            {product.quantity > 0 && (
              <button
                className="btn btn-outline-dark mx-1  col-lg col-md"
                onClick={() => addProduct(product)}
              >
                {carted}
              </button>
            )}

            {/* {product.quantity <= 0 &&
              <div>
                <p style={{padding:"2em",backgroundColor:"#777",color:"white"}}>
                  out of stock
                </p>
              </div>} */}

            {/* <NavLink
              to="/cart"
              className="btn btn-dark  mx-3 px-3 my-1 col-lg-8 col-md"
            >
              Go to Cart
            </NavLink> */}
            <button
              className="btn btn-outline-primary mx-1  col-lg col-md"
              onClick={showAddReview}
            >
              Add Review
            </button>

            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    List Name <br />
                    <input type="text" style={{ height: "2rem" }} />
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Use lists to save items for later. All lists are private
                    unless you share them with others.
                  </Typography>
                  <div style={{ margin: " 2rem 3rem" }}>
                    <Button
                      style={{ margin: "10px", borderRadius: "10%" }}
                      variant="contained"
                      color="success"
                    >
                      Cancel
                    </Button>
                    <Button style={{ borderRadius: "10%" }} variant="contained">
                      Create
                    </Button>
                  </div>
                </Box>
              </Modal> */}
          </div>
        </div>
        <div
          style={{
            height: "400px",
            width: "50%",
            border: "2px solid #eee",
            padding: "20px",
            marginLeft: "30px",
            position: "absolute",
            left: "25%",
            top: "200px",
            borderRadius: "15px",
            backgroundColor: "white",
            margin: "auto",
            boxShadow: "rgb(0 0 0 / 30%) 0px 1px 20px 20px",
            transitionDuration: "0.5s",
          }}
          className={reviewForm}
        >
          <TextField
            className="title"
            style={{ width: "70%" }}
            onChange={(event) => {
              newReview.title = event.target.value;
            }}
            id="demo-helper-text-misaligned-no-helper"
            label="Review Title"
          />
          <TextField
            className="comment"
            style={{ width: "70%" }}
            onChange={(event) => {
              newReview.description = event.target.value;
            }}
            id="demo-helper-text-misaligned-no-helper"
            label="Comment"
          />
          <Rating
            name="simple-controlled"
            onChange={(event) => {
              newReview.rating = +event.target.value;
            }}
          />
          {popup}
          <Button
            style={{ width: "30%", margin: "10px" }}
            onClick={sendReview}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
          <Button
            style={{ width: "30%", margin: "10px" }}
            onClick={closeAddReview}
            variant="contained"
            color="error"
            endIcon={<CloseIcon />}
          >
            Close
          </Button>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            {reviews.map((review) => {
              return (
                <Card
                  sx={{ minWidth: 275 }}
                  style={{
                    marginBottom: "30px",
                    border: "2px solid lightblue",
                  }}
                >
                  <CardContent>
                    <Typography
                      style={{ color: "#999", fontWeight: "bolder" }}
                      variant="h4"
                      component="div"
                    >
                      {review.title}
                    </Typography>
                    <Typography
                      style={{ color: "7A0BC0", fontWeight: "bold" }}
                      sx={{ mb: 1.5 }}
                      color="text.secondary"
                    >
                      {review.user}
                    </Typography>
                    <hr style={{ color: "blue" }}></hr>
                    <Typography variant="body2">
                      {review.description}
                      <br />
                    </Typography>
                    <Rating name="read-only" value={review.rating} readOnly />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
