// SAVE SHIPPING ADDRESS
import { useHistory } from "react-router-dom";

export const saveShippingAddress = (list) => {
  return{
      type : "GET_ADDRESS",
      payload : list
  }
}
  
  export const clearLocalStorageCart = () => (dispatch) => {
    
    dispatch({
      type: 'CLEAR_CART',
    });
  
    //localStorage.removeItem('persist:root');
    };

  
    export const goToHome = () => (dispatch) => {
      const history = useHistory();

      dispatch({
        type: 'GO_HOME',
      });
    
      history.push("/")
    };
  
    