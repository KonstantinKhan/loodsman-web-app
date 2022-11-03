import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom/client';

import {App} from "./components/app/App";

import "./styles/style.sass"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <App/>
    </>
);
