const INITIAL_STATE = {
    list: []
  };
  
  export function handleAddress(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "GET_ADDRESS":
          console.log("STATE",state)
          console.log("ACTION",action)
        return {
          ...state,
          list: action.payload,
        };
     
      default:
        return state;
    }
  }
  export default handleAddress;

