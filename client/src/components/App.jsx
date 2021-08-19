import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import connection from '../websockets';
import Header from './features/header/Header';
import Controls from './features/controls/Controls';
import Feed from './features/feed/Feed';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const selectSettings = state => state.settings;

const getMessageType = (data) => {
  if (data.body !== undefined) {
    return 'feed/addBody';
  }
  if (data.type === 'request') {
    return 'feed/addRequest';
  }
  if (data.type === 'response') {
    return 'feed/addResponse';
  }
};

const App = () => {

  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    connection.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (settings.autoUpdate) {
        const action = getMessageType(data);
        dispatch({
          type: action,
          payload: {data, options: {compact: settings.autoCompact}}
        });
      }
    }
  }, [settings]);

  return (
    <div className="container">
      <Header />
      <Controls />
      <Feed />
    </div>
  )
};

export default App;
