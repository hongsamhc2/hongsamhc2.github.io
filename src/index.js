import React from 'react'
import {render} from 'react-dom'
import {createRoot} from 'react-dom/client'
import {BrowserRouter,HashRouter} from 'react-router-dom'
import App from './App'
const rootElement = createRoot(document.getElementById('root'))
console.log('hello')

rootElement.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
)