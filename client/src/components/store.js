import { createStore } from 'redux';
import rootReducer from './reducer';

let preloadedState;
const persistedData = localStorage.getItem('tapHeadersData');

if (persistedData) {
  preloadedState = JSON.parse(persistedData);
}

const store = createStore(
  rootReducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
