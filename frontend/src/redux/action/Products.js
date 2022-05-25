import axios from "axios";
export const getProductsList = (id,more) => (dispatch) => {
  console.log(more)
  return axios({
    method: "get",
    url: `http://localhost:8080/products/${id}`,
    params: {more: more},
  })
    .then((res) =>
      dispatch({
        type: "GET_PRODUCTS_LIST",
        payload: res.data.data,
      })
    )
    .catch((err) => console.log(err));
};
export const getCategoriesList = () => (dispatch) => {
  return axios.get(`http://localhost:8080/categories`)
    .then((res) =>
      dispatch({
        type: "GET_CATEGORIES_LIST",
        payload: res.data.data,
      })
    )
    .catch((err) => console.log(err));
};
export const searchProduct = (word,category_id,list) => {
  const regex = new RegExp(word, "i"); 
  let newList;
  if(category_id === ""){
    newList = list.filter((product)=>regex.test(product.name))
  }
  else{
    newList = list.filter((product)=>product.category_id === category_id && regex.test(product.name)) 
    console.log(newList)
  }
  return{
    type : "SEARCH_PRODUCT",
    payload : newList
}
};
export const getProduct = (product_id) => {
  return{
      type : "GET_PRODUCT",
      payload : product_id
  }
}
export const selectGategory = (id) => {
  return{
      type : "SELECT_CATEGORY",
      payload : id
  }
}
export const sortAscend = (list) => {
  return{
      type : "SORT_ASCEND",
      payload : list
  }
}
export const sortDescend = (list) => {
  return{
      type : "SORT_DESCEND",
      payload : list
  }
}
export const sortRating = (list) => {
  return{
      type : "SORT_RATING",
      payload : list
  }
}