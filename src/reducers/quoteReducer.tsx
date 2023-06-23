import { IQuoteReducer } from '../interfaces/quote/IQuote'

const initialState: IQuoteReducer = {
  user: '',
  quote: undefined,
  area: 0,
  areaInMarla: 0,
  floorPlan: undefined,
  generalQuestions: undefined,
  securityQuestions: undefined,
  _id: ''
}

export function quoteReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_QUOTE_REDUCER':
      return {
        ...state,
        ...action.payload
      }
    case 'EMPTY_QUOTE_REDUCER':
      return {
        user: '',
        quote: undefined,
        area: 0,
        areaInMarla: 0,
        floorPlan: undefined,
        generalQuestions: undefined,
        securityQuestions: undefined,
        _id: ''
      }
    default:
      return state
  }
}
