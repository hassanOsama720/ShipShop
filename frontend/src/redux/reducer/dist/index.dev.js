"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handleCart = _interopRequireDefault(require("./handleCart"));

var _handleOrders = _interopRequireDefault(require("./handleOrders"));

var _redux = require("redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootReducers = (0, _redux.combineReducers)({
  handleCart: _handleCart["default"],
  handleOrders: _handleOrders["default"]
});
var _default = rootReducers;
exports["default"] = _default;