import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Buffer } from 'buffer';
import { createRoot } from 'react-dom/client';
(window as any).global = window;
(window as any).global.Buffer = Buffer;
(window as any).process = {
    version: '',
    node: false,
    env: false,
};


const container:HTMLElement | any = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
