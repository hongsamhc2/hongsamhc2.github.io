import React from 'react'
import {render} from 'react-dom'
import {createRoot} from 'react-dom/client'
import {BrowserRouter,HashRouter} from 'react-router-dom'
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

import App from './App'
const rootElement = createRoot(document.getElementById('root'))
const store = createStore(rootReducer, composeWithDevTools());

rootElement.render(
    <Provider store={store}>
    <BrowserRouter>

    <App />
    </BrowserRouter>
    </Provider>
)