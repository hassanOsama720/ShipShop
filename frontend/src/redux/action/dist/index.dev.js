"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zeroWishlist = exports.zeroCart = exports.delWishlist = exports.addWishlistFromDB = exports.addWishlistFirst = exports.addWishlist = exports.delCart = exports.addOrdersFromDB = exports.addCartFromDB = exports.addCartFirst = exports.addCart = void 0;

// For Add Item to Cart
var addCart = function addCart(product) {
  return {
    type: "ADDITEM",
    payload: product
  };
};

exports.addCart = addCart;

var addCartFirst = function addCartFirst(product) {
  return {
    type: "ADDITEMFIRST",
    payload: product
  };
};

exports.addCartFirst = addCartFirst;

var addCartFromDB = function addCartFromDB(productArr) {
  return {
    type: "ADDITEMS",
    payload: productArr
  };
};

exports.addCartFromDB = addCartFromDB;

var addOrdersFromDB = function addOrdersFromDB(productsArr) {
  return {
    type: "ADDORDERS",
    payload: productsArr
  };
}; // For Delete Item From Cart


exports.addOrdersFromDB = addOrdersFromDB;

var delCart = function delCart(product) {
  return {
    type: "DELITEM",
    payload: product
  };
};

exports.delCart = delCart;

var addWishlist = function addWishlist(product) {
  return {
    type: "ADDITEMWISHLIST",
    payload: product
  };
};

exports.addWishlist = addWishlist;

var addWishlistFirst = function addWishlistFirst(product) {
  return {
    type: "ADDITEMFIRSTWISHLIST",
    payload: product
  };
};

exports.addWishlistFirst = addWishlistFirst;

var addWishlistFromDB = function addWishlistFromDB(productArr) {
  return {
    type: "ADDITEMSWISHLIST",
    payload: productArr
  };
}; // For Delete Item From Cart


exports.addWishlistFromDB = addWishlistFromDB;

var delWishlist = function delWishlist(product) {
  return {
    type: "DELITEMWISHLIST",
    payload: product
  };
}; // For Delete Item From Cart


exports.delWishlist = delWishlist;

var zeroCart = function zeroCart(product) {
  return {
    type: "ZEROITEM",
    payload: product
  };
};

exports.zeroCart = zeroCart;

var zeroWishlist = function zeroWishlist(product) {
  return {
    type: "ZEROITEMWISHLIST",
    payload: product
  };
};

exports.zeroWishlist = zeroWishlist;