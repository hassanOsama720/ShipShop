const INITIAL_STATE = {
    list: [],
    vlist: [],
    categories:[],
    product:"",
    category:""
  };
  
  export function ProductsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "GET_PRODUCTS_LIST":
        return {
          ...state,
          list: action.payload,
          vlist: action.payload,
        };
      case "GET_PRODUCT":
        return {
          ...state,
          product: action.payload,
        };
      case "GET_CATEGORIES_LIST":
        return {
          ...state,
          categories: action.payload,
        };
      case "SEARCH_PRODUCT":
        return {
          ...state,
          vlist: action.payload,
        };
      case "SELECT_CATEGORY":
        return {
          ...state,
          category: action.payload,
        };
      case "SORT_ASCEND":
        return {
          ...state,
          vlist: action.payload.sort((a, b) => a.price > b.price ? 1 : -1),
        };
      case "SORT_DESCEND":
        return {
          ...state,
          vlist: action.payload.sort((a, b) => a.price > b.price ? -1 : 1),
        };
      case "SORT_RATING":
        return {
          ...state,
          vlist: action.payload.sort((a, b) => a.rating > b.rating ? -1 : 1),
        };
      default:
        return state;
    }
  }
