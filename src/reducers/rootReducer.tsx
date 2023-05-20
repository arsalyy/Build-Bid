import { combineReducers } from 'redux'
import { AnyAction } from 'redux'
import { adminReducer } from './adminReducer'
import { startReducer } from './startReducer'
import { userReducer } from './userReducer'
import { IReduxState } from '../interfaces/IReduxState'

const reducers = combineReducers<IReduxState>({
  adminReducer,
  startReducer,
  userReducer
})

export type StoreState = ReturnType<typeof reducers>
const rootReducer = (state: StoreState, action: AnyAction): StoreState => {
  if (action.type === 'EMPTY_STORE') {
    state = {
      ...state,
      adminReducer: undefined,
      startReducer: undefined,
      userReducer: undefined
    }
  }

  return reducers(state, action)
}
export default rootReducer
