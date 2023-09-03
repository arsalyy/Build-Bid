import { IDetailsReducer } from '../interfaces/details/IDetails'

const initialState: IDetailsReducer = {
  generalQuestions: [],
  securityQuestions: [],
  floorPlan: undefined
}

export function detailsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DETAILS_REDUCER':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_GENERAL_QUESTIONS':
      return {
        ...state,
        generalQuestions: action.payload
      }
    case 'SET_SECURITY_QUESTIONS':
      return {
        ...state,
        securityQuestions: action.payload
      }
    case 'SET_FLOOR_PLAN':
      return {
        ...state,
        floorPlan: action.payload
      }
    case 'EMPTY_DETAILS_REDUCER': {
      return { generalQuestions: [], securityQuestions: [], floorPlan: undefined }
    }
    default:
      return state
  }
}
