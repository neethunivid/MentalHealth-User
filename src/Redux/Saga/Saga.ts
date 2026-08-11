import { put, takeEvery } from 'redux-saga/effects';
// import apiClient from '../../API/Api-client';
import apiClient from '../../API/API-client';
import { fetchDataSuccess, fetchDataFailure} from '../actions';
// import { push } from 'connected-react-router';
import store from '../store';
//import { Redirect } from 'react-router-dom';

function* fetchDataSaga(action:any): Generator<any, void, any> {
 
  const { key,api,request } = action.payload;

  try { 
    //const response = yield apiClient.get(`/data/${key}`);
    const response = yield apiClient.post(api,request);
    
    yield put(fetchDataSuccess(key, response.data));
  } catch (error:any) {
   
    if (error.response && (error.response.data.code === 401 || error.response.data.code === 403)) {

   
      // yield put(push("/login")); // Redirect to the login page or any other desired page
    } else {
      yield put(fetchDataFailure(key, error));
    }
  }
}



export function* watchFetchData() {
  console.log("watch saga >> ");
  yield takeEvery('FETCH_DATA', fetchDataSaga);
}
