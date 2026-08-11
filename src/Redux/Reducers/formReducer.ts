const initialState = {
  
};

const formDataReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      }
        
        
      

 
    default:
      return state;
  }
};

export default formDataReducer;
