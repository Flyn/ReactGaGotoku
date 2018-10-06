import fetch from 'cross-fetch'

import { SELECT_LOCATION, REQUEST_DETAILS, RECEIVE_DETAILS } from "../constants/actiontypes";

export const selectLocation = location => ({ type: SELECT_LOCATION, id: location });

var requestDetails = id => ({type : REQUEST_DETAILS, id: id});
var receiveDetails = (id, json) => ({type : RECEIVE_DETAILS, id, details : json.data, receivedAt : Date.now()});

export function fetchDetails(id) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestDetails(id))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch('/api/kenzan/gion/'+id)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveDetails(id, json))
      )
  }
}
