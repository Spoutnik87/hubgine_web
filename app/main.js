import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import getRoutes from './routes';
import { loadState, saveState } from './util/localStorage';
import { connect as connectUser } from './actions/user';

const initialState = loadState();
const store = configureStore(window.INITIAL_STATE);

//Sauvegarde de l'utilisateur persistante.
/*store.subscribe(() => {
  saveState( {
    user: store.getState().user
  });
});*/

/*const serializedUser = localStorage.getItem('user');
if (serializedUser!= undefined)
{
  store.dispatch(connectUser("token", "ADMIN"));
}*/
//store.dispatch(connectUser("token", "ADMIN"));
console.log(JSON.stringify(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={getRoutes(store)}/>
  </Provider>,
  document.getElementById('app')
);
