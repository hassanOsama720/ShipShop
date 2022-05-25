import axios from "axios";
const orders = [];

const handleOrders = (state = orders, action) => {
  new Promise(resolve => setTimeout(resolve, 500)); 
  const product = action.payload;
  switch (action.type) {
    default:
        const orders = state.find((x) => x._id === product._id);
        
        if (orders) {
          if (orders.quantity === orders.qty)
            return state.map((x) =>
              x._id === product._id ? { ...x } : x
            );
          // Increase the Quantity
          return state.map((x) =>
            x._id === product._id ? { ...x } : x
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

        

}
};

export default handleOrders;
