import {createStore} from 'redux'
import reducer  from './reducer';

let initialState={

};

export const Store = createStore(reducer, initialState);
