import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
  switch(action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      // confused about how this creates a copy of state and notifies the...store?
      return action.authors;
    default: 
      return state;
  }
}

// reducer takes current state and action and return NEW state
// this reducer handles list of courses, set default arg so that first time, list of courses is empty