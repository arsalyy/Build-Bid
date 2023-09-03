import { IPriceReducer } from '../interfaces/price/IPrice'

const initialState: IPriceReducer = {}

export function priceReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PRICES':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
