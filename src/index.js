import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import $ from 'jquery'
// import "antd/dist/antd.css";
import 'antd/dist/reset.css'
import './utils/i18n'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import reportWebVitals from './reportWebVitals'
import store, { Persistor } from './store'
import App from './App'

window.jQuery = $
require('bootstrap')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
