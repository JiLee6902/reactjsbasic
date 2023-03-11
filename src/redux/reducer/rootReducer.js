import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import passwordReducer from './passwordReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    userpassword: passwordReducer,
});

export default rootReducer;