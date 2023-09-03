import { IStartReducer } from '../interfaces/start/IStart'

const initialState: IStartReducer = {
  area: ''
}

export function startReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AREA':
      return {
        ...state,
        area: action.payload
      }
    default:
      return state
  }
}
