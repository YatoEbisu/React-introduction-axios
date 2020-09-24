import React from 'react';
import api from './Services/api';
import Routes from './Routes'

import './styles.css'

import Header from './Components/Header';
import Main from './Pages/main';


const App = () => (
  <div>
     <Header />
     <Routes />
  </div>
);

export default App;