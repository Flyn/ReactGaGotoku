import { combineReducers } from 'redux'

import { SELECT_LOCATION, REQUEST_DETAILS, RECEIVE_DETAILS } from "../constants/actiontypes";

function selectedLocation(state={}, action) {
  switch (action.type) {
    case SELECT_LOCATION:
      return action.id || null
    default :
      return state
  }
}

function locationDetails(state={isFetching: false, details: {}}, action) {
  switch (action.type) {
    case REQUEST_DETAILS:
      return Object.assign({}, state, {
        isFetching : true
      })
    case RECEIVE_DETAILS:
      return Object.assign({}, state, {
        isFetching : false,
        details : action.details,
        lastUpdated : action.receivedAt
      })
    default:
      return state
  }
}

function locations(state={}, action) {
  switch (action.type) {
    case RECEIVE_DETAILS:
    case REQUEST_DETAILS:
      return Object.assign({}, state, {
        [action.id] : locationDetails(state[action.id], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedLocation,
  locations
})

export default rootReducer;
