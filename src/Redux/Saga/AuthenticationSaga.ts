import { put, takeEvery } from 'redux-saga/effects';
// import apiClient from '../../API/Api-client';
import apiClient from '../../API/API-client';
import { fetchDataSuccess, fetchDataFailure } from '../actions';
import { config } from 'process';

function* AuthenticationSaga(action:any): Generator<any, void, any> {
 
  const { key,request, headers } = action.payload;

  try { 
   
    const response = yield apiClient.post(`/members/memberSearch2`,request, headers);
 
    
    yield put(fetchDataSuccess(key, response));
  } catch (error) {
    yield put(fetchDataFailure(key, error));
  }
}



export function* loginSaga() {

  yield takeEvery('AUTHENTICATE_DATA', AuthenticationSaga);
}
