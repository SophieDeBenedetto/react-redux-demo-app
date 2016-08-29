import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  // short hand property names
  courses,
  authors,
  ajaxCallsInProgress
})

export default rootReducer;