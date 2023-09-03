import { IQuoteReducer } from 'interfaces/quote/IQuote'

export function setQuoteReducer(data: IQuoteReducer) {
  return {
    type: 'SET_QUOTE_REDUCER',
    payload: data
  }
}

export function emptyQuoteReducer() {
  return {
    type: 'EMPTY_QUOTE_REDUCER'
  }
}
