import { all } from 'redux-saga/effects';
import { watchFetchData } from './Saga';
import { loginSaga } from './AuthenticationSaga';

export default function* rootSaga() {

  yield all([
    watchFetchData(),
    loginSaga()
    // Add more sagas here if needed
  ]);
}
