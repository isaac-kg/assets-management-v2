import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/style.css';
import { ConfigProvider } from 'antd';

import { Provider } from "react-redux"
import store, {persistor} from "./store/store"
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
  <PersistGate persistor={persistor}>
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#084077",
        },
      }}
    >
      <App />
      </ConfigProvider>
  </React.StrictMode>
  </PersistGate>
</Provider>
);
