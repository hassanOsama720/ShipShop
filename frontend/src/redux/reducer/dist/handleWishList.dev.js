"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cart = [];

var handleWishlist = function handleWishlist() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : cart;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  new Promise(function (resolve) {
    return setTimeout(resolve, 500);
  });
  var product = action.payload;

  switch (action.type) {
    case "ADDITEMWISHLIST":
      // Check if Product is Already Exist
      var exist = state.find(function (x) {
        return x._id === product._id;
      });

      if (exist) {
        if (exist.quantity === exist.qty) return state.map(function (x) {
          return x._id === product._id ? _objectSpread({}, x, {
            qty: x.qty
          }) : x;
        }); // Increase the Quantity

        return state.map(function (x) {
          return x._id === product._id ? _objectSpread({}, x, {
            qty: x.qty + 1
          }) : x;
        });
      } else {
        var _product = action.payload;

        var _response = (0, _axios["default"])({
          method: "post",
          url: "http://localhost:8080/wishlist",
          headers: {
            Authorization: "Bearer ".concat(localStorage.getItem("accessToken"))
          },
          data: _product
        });

        return [].concat(_toConsumableArray(state), [_objectSpread({}, _product, {
          qty: 1
        })]);
      }

      break;

    case "ADDITEMFIRSTWISHLIST":
      var e = state.find(function (x) {
        return x._id === product._id;
      });

      if (!e) {
        product.qty = 1;
        var response2 = (0, _axios["default"])({
          method: "post",
          url: "http://localhost:8080/wishlist",
          headers: {
            Authorization: "Bearer ".concat(localStorage.getItem("accessToken"))
          },
          data: product
        });
        return [].concat(_toConsumableArray(state), [_objectSpread({}, product)]);
      }

      return state.map(function (x) {
        return x._id === product._id ? _objectSpread({}, x, {
          qty: x.qty
        }) : x;
      });
      break;

    case "ADDITEMSWISHLIST":
      // Check if Product is Already Exist
      var ex = state.find(function (x) {
        return x._id === product._id;
      });

      if (ex) {
        if (ex.quantity === ex.qty) return state.map(function (x) {
          return x._id === product._id ? _objectSpread({}, x, {
            qty: x.qty
          }) : x;
        }); // Increase the Quantity

        return state.map(function (x) {
          return x._id === product._id ? _objectSpread({}, x, {
            qty: x.qty + 1
          }) : x;
        });
      } else {
        var _product2 = action.payload;
        return [].concat(_toConsumableArray(state), [_objectSpread({}, _product2)]);
      }

      break;

    case "DELITEMWISHLIST":
      var exist1 = state.find(function (x) {
        return x._id === product._id;
      });

      if (exist1 && exist1.qty === 1) {
        return state.map(function (x) {
          return x._id === product._id ? _objectSpread({}, x, {
            qty: x.qty
          }) : x;
        });
      } else {
        var _response2 = (0, _axios["default"])({
          method: "put",
          url: "http://localhost:8080/wishlist",
          headers: {
            Authorization: "Bearer ".concat(localStorage.getItem("accessToken"))
          },
          data: {
            _id: product._id,
            qty: product.qty - 1
          }
        });

        return state.map(function (x) {
          return x._id === product._id ? _objectSpread({}, x, {
            qty: x.qty - 1
          }) : x;
        });
      }

      break;

    case "ZEROITEMWISHLIST":
      var exist2 = state.find(function (x) {
        return x._id === product._id;
      });
      var response = (0, _axios["default"])({
        method: "delete",
        url: "http://localhost:8080/wishlist",
        headers: {
          Authorization: "Bearer ".concat(localStorage.getItem("accessToken"))
        },
        data: product
      });
      return state.filter(function (x) {
        return x._id !== exist2._id;
      });
      break;

    default:
      return state;
      break;
  }
};

var _default = handleWishlist;
exports["default"] = _default;