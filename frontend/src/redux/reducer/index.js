import handleCart from "./handleCart";
import handleOrders from "./handleOrders";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
    handleCart,
    handleOrders
})

export default rootReducers;