import { combineReducers } from 'redux'
import { AnyAction } from 'redux'
import { startReducer } from './startReducer'
import { IReduxState } from '../interfaces/IReduxState'

const reducers = combineReducers<IReduxState>({
  startReducer
})

export type StoreState = ReturnType<typeof reducers>
const rootReducer = (state: StoreState, action: AnyAction): StoreState => {
  if (action.type === 'EMPTY_STORE') {
    state = {
      ...state,
      startReducer: undefined
    }
  }

  return reducers(state, action)
}
export default rootReducer
