import { IPriceReducer } from 'interfaces/price/IPrice'

export function setPrices(data: IPriceReducer) {
  return {
    type: 'SET_PRICES',
    payload: data
  }
}
