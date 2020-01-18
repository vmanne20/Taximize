import { combineReducers } from 'redux';
import authReducer from './authReducer'
import dataReducer from './dataReducer'

const rootReducer = combineReducers({
    authReducer,
    dataReducer
})

export default rootReducer