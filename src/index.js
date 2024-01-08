import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ObjectsStore from './store/ObjectsStore';

export const Context = createContext(null)

// ObjectsStore

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    objects: new ObjectsStore(),
    
  }}>
  
      <App />
  </Context.Provider>
);


