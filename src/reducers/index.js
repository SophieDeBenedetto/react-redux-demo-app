import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
  // short hand property names
  courses,
  authors
})

export default rootReducer;