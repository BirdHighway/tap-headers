import { combineReducers } from 'redux';
import settingsReducer from './features/settingsSlice';
import queueReducer from './features/queueSlice';

const rootReducer = combineReducers({
  settings: settingsReducer,
  queue: queueReducer
});

export default rootReducer;
