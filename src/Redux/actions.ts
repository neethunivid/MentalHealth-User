
export const fetchData = (key:any,api:any,request: any,) => ({
  type: 'FETCH_DATA',
  payload: { key,api,request },
});


export const fetchDataSuccess = (key:any, data:any) => ({
  type: 'FETCH_DATA_SUCCESS',
  payload: { key, data },
});

export const fetchDataFailure = (key:any, error:any) => ({
  type: 'FETCH_DATA_FAILURE',
  payload: { key, error },
});


export const getFormData = (key: any, data: any) => {
 
  return {
    type: "GET_FORM_DATA",
    payload: {
      key: key,
      data: data,
    },
  };
};

//set form data
export const setFormData = (key:any,data: any) => {
  console.log(data,'hiii this is action')
  console.log(key,'this is the key');
  return {
    type: 'SET_FORM_DATA',
    payload:{
      key:key,
      data:data,
    }
  };
};
