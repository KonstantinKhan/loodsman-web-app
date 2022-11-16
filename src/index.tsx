import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom/client';

import {App} from "./components/app/App";

import "./styles/style.sass"
import {Provider} from "react-redux";
import {store} from "./redux";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
