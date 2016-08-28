import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  switch(action.type) {
    case types.CREATE_COURSE:
      // don't mutate state!!!
        // state.push(action.course);
        // return state;
      // instead use es6 spread operator
      // if you to make a copy of state array, and add new course to it, which we did by making a copy of that course
      // copy array and create new array with an extra/new value
      return [...state, 
        Object.assign({}, 
        action.course)
      ];
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    default: 
      return state;
  }
}

// reducer takes current state and action and return NEW state
// this reducer handles list of courses, set default arg so that first time, list of courses is empty