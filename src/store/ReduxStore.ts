import { persistReducer } from 'redux-persist'
import { createStore } from 'redux'
import rootReducer from '../reducers/rootReducer'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['startReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer)
