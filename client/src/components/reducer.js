import { combineReducers } from 'redux';
import settingsReducer from './features/settingsSlice';
import queueReducer from './features/queueSlice';
import feedReducer from './features/feedSlice';

const rootReducer = combineReducers({
  settings: settingsReducer,
  queue: queueReducer,
  feed: feedReducer
});

export default rootReducer;
