import React from 'react';
import { useSelector } from 'react-redux';
import connection from '../websockets';
import Header from './features/header/Header';
import Controls from './features/controls/Controls';
import Feed from './features/feed/Feed';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const App = () => {
  return (
    <div className="container">
      <Header />
      <Controls />
      <Feed />
    </div>
  )
};

export default App;
