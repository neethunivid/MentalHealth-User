import {combineReducers} from 'redux'
import reducer from './reducers'
import formReducer from './Reducers/formReducer'

export default combineReducers({
    reducer,formData:formReducer
})