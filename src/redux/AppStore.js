import {createStore, combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {shopInfo} from './reducers';

const rootReducer = combineReducers({shopInfo});


export const Store = createStore(rootReducer, applyMiddleware(thunk));

