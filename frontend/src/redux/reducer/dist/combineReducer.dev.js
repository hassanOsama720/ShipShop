"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _handleCart = _interopRequireDefault(require("./handleCart"));

var _handleOrders = _interopRequireDefault(require("./handleOrders"));

var _handleAddress = _interopRequireDefault(require("./handleAddress"));

var _index = _interopRequireDefault(require("./index"));

var _Products = require("./Products");

var _handleWishList = _interopRequireDefault(require("./handleWishList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var r = (0, _redux.combineReducers)({
  handleCart: _handleCart["default"],
  handleOrders: _handleOrders["default"],
  rootReducers: _index["default"],
  ProductsReducer: _Products.ProductsReducer,
  handleAddress: _handleAddress["default"],
  handleWishlist: _handleWishList["default"]
});
var _default = r;
exports["default"] = _default;