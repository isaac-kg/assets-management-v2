import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/style.css';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
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
  </React.StrictMode>,
);
