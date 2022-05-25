import { combineReducers } from "redux";
import handleCart  from "./handleCart";
import handleOrders from "./handleOrders";
import handleAddress from "./handleAddress";

import  rootReducers  from "./index";
import { ProductsReducer } from "./Products";
import handleWishlist from "./handleWishList";



const r= combineReducers({
 handleCart:handleCart,
 handleOrders:handleOrders,
 rootReducers:rootReducers,
 ProductsReducer:ProductsReducer,
 handleAddress:handleAddress,
 handleWishlist:handleWishlist,
});

export default r