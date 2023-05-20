import { persistReducer, createMigrate } from 'redux-persist'
import { createStore } from 'redux'
import rootReducer from '../reducers/rootReducer'
import storage from 'redux-persist/lib/storage'

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
  whitelist: ['adminReducer', 'startReducer', 'userReducer']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer)
