import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';
import { Provider } from "react-redux";
import store from "./store/index";

import style from './static/style.scss';

window.onload = () => {
  ReactDOM.render(<Provider store={store}><AppRoutes/></Provider>, document.getElementById('main'));
};

/*import {fetchDetails} from './actions/index'

store.dispatch(fetchDetails('nakamura'))
  .then(() => console.log(store.getState()))
*/
