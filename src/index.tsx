import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import rootReducer from '../src/reducers/rootReducer'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const migrations = {
  0: () => {
    console.log('version 0')
    return undefined
  }
}
const persistConfig = {
  key: 'root',
  storage,
  version: 0,
  migrate: createMigrate(migrations, { debug: false }),
  whitelist: ['startReducer']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer)
const persistor = persistStore(store)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
