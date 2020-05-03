import React from 'react';
import Main from './component/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();


export default function App() {
  return (
    <Provider store={store}>
         <Main />
    </Provider>
  
  );
}

