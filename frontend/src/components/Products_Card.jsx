import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../pages/Products/Products.css";
import { Rating } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/action/Products";
import {
  zeroCart,
  addCartFirst,
  zeroWishlist,
  addWishlistFirst,
} from "../redux/action";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useEffect, useState } from "react";

function Products_Card(props) {
  const wishList = useSelector((state) => state.handleWishlist);
  const cartList = useSelector((state) => state.handleCart);
  const [wishListed, setWishListed] = useState("grey");
  const [carted, setcarted] = useState("grey");
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    for (let index = 0; index < wishList.length; index++) {
      if (wishList[index]._id === props.product._id) {
        setWishListed("red");
        break;
      }
    }
    for (let index = 0; index < cartList.length; index++) {
      if (cartList[index]._id === props.product._id) {
        setcarted("green");
        break;
      }
    }
  }, [wishList, cartList]);
  const navigateTo = (e) => {
    // dispatch(getProduct(e.target.value))
    history.push(`/product/${e.target.value}`);
  };
  const addProductWishlist = (product) => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
      return;
    }

    if (wishListed === "grey") {
      dispatch(addWishlistFirst(product));
      setWishListed("red");
    }
    if (wishListed === "red") {
      dispatch(zeroWishlist(product));
      setWishListed("grey");
    }
  };
  const addProduct = (product) => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
      return;
    }

    if (carted === "grey") {
      dispatch(addCartFirst(product));
      setcarted("green");
    }
    if (carted === "green") {
      dispatch(zeroCart(product));
      setcarted("grey");
    }
  };
  return (
    <Card
      key={props.product._id}
      className="Card1"
      style={{ width: "230px", height: "350px", marginBottom: "50px" }}
    >
      <CardMedia
        style={{ objectFit: "contain" }}
        component="img"
        height="100%"
        image={props.product.images[0]}
        alt="green iguana"
      />
      <CardContent className="Card1-content">
        <Typography
          style={{ fontWeight: "bold" }}
          gutterBottom
          variant="h7"
          component="div"
        >
          {props.product.name}
        </Typography>
        <Typography
          style={{ color: "white", textOverflow: "ellipsis" }}
          gutterBottom
          variant="h7"
          component="div"
        >
          {props.product.price} E£
        </Typography>
        <Rating
          className="product-info"
          name="read-only"
          value={props.product.rating}
          readOnly
        />
        <Button
          className="product-info"
          style={{ width: "95%" }}
          variant="outlined"
          value={props.product._id}
          onClick={(e) => navigateTo(e)}
        >
          More Details
        </Button>
        <div
          className="product-info"
          style={{ justifyContent: "space-evenly" }}
        >
          <FavoriteIcon
            style={{ color: wishListed, cursor: "pointer" }}
            variant="outlined"
            onClick={() => addProductWishlist(props.product)}
          ></FavoriteIcon>
          {props.product.quantity?<ShoppingCartIcon
            style={{ color: carted, cursor: "pointer" }}
            variant="outlined"
            onClick={() => {
              if (props.product.quantity) {
                addProduct(props.product);
              } else {
                alert("out of stock sorry");
              }
            }}
          ></ShoppingCartIcon>
          : <div style={{display:"flex",cursor:"pointer"}}><p><strong>OUT OF STOCK</strong></p><RemoveShoppingCartIcon style={{marginLeft:"0.4em"}}/></div>
          }
        </div>
      </CardContent>
    </Card>
  );
}

export default Products_Card;
