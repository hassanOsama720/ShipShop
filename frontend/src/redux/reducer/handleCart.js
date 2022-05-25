import axios from "axios";
const cart = [];

const handleCart = (state = cart, action) => {
  new Promise(resolve => setTimeout(resolve, 500)); 
  const product = action.payload;

  switch (action.type) {
    
    case "ADDITEM":
      
      // Check if Product is Already Exist
      const exist = state.find((x) => x._id === product._id);

      if (exist) {
        if (exist.quantity === exist.qty)
          return state.map((x) =>
            x._id === product._id ? { ...x, qty: x.qty } : x
          );
        // Increase the Quantity
        let response = axios({
          method: "put",
          url: "http://localhost:8080/cart",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          data: { _id: product._id, qty: product.qty + 1 },
        }).then((res) => {});

        return state.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        const product = action.payload;

        let response = axios({
          method: "post",
          url: "http://localhost:8080/cart",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          data: product,
        });
        return [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ];
      }
      break;

    case "ADDITEMFIRST":
      const e = state.find((x) => x._id === product._id);
      if (!e) {
        product.qty = 1;
        let response2 = axios({
          method: "post",
          url: "http://localhost:8080/cart",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          data: product,
        });

        return [
          ...state,
          {
            ...product,
          },
        ];
      }
      return state.map((x) =>
        x._id === product._id ? { ...x, qty: x.qty } : x
      );

      break;
    case "ADDITEMS":
      // Check if Product is Already Exist
      const ex = state.find((x) => x._id === product._id);
      if (ex) {
        if (ex.quantity === ex.qty)
          return state.map((x) =>
            x._id === product._id ? { ...x, qty: x.qty } : x
          );
        // Increase the Quantity
        return state.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        const product = action.payload;

        return [
          ...state,
          {
            ...product,
          },
        ];
      }

      break;


    case "DELITEM":
      const exist1 = state.find((x) => x._id === product._id);
      if (exist1 && exist1.qty === 1) {
        return state.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty } : x
        );
      } else {
        let response = axios({
          method: "put",
          url: "http://localhost:8080/cart",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          data: { _id: product._id, qty: product.qty - 1 },
        });

        return state.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      break;

    case "ZEROITEM":
      const exist2 = state.find((x) => x._id === product._id);

      let response = axios({
        method: "delete",
        url: "http://localhost:8080/cart",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: product,
      });

      return state.filter((x) => x._id !== exist2._id);

      break;
    default:
      return state;
      break;
  }
};

export default handleCart;
