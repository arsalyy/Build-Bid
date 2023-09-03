import { combineReducers } from 'redux'
import { AnyAction } from 'redux'
import { adminReducer } from './adminReducer'
import { startReducer } from './startReducer'
import { userReducer } from './userReducer'
import { detailsReducer } from './detailsReducer'
import { quoteReducer } from './quoteReducer'
import { priceReducer } from './priceReducer'
import { IReduxState } from '../interfaces/IReduxState'

const reducers = combineReducers<IReduxState>({
  adminReducer,
  startReducer,
  userReducer,
  detailsReducer,
  quoteReducer,
  priceReducer
})

export type StoreState = ReturnType<typeof reducers>
const rootReducer = (state: StoreState, action: AnyAction): StoreState => {
  if (action.type === 'EMPTY_STORE') {
    state = {
      ...state,
      adminReducer: undefined,
      startReducer: undefined,
      userReducer: undefined,
      detailsReducer: undefined,
      quoteReducer: undefined,
      priceReducer: undefined
    }
  }

  return reducers(state, action)
}
export default rootReducer
