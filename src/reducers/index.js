import {combineReducers} from 'redux';
import courses from './courseReducer';

const rootReducer = combineReducers({
  // short hand property names
  courses
})

export default rootReducer;