import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Se você tiver um CSS global do Vite/Tailwind, importa aqui:
// import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
