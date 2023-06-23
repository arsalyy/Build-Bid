import { IDetails, IFloorPlan, IDetailsReducer } from 'interfaces/details/IDetails'

export function setDetails(data: IDetailsReducer) {
  return {
    type: 'SET_DETAILS_REDUCER',
    payload: data
  }
}

export function setGeneralQuestions(data: IDetails[]) {
  return {
    type: 'SET_GENERAL_QUESTIONS',
    payload: data
  }
}

export function setSecurityQuestions(data: IDetails[]) {
  return {
    type: 'SET_SECURITY_QUESTIONS',
    payload: data
  }
}

export function setFloorPlan(data: IFloorPlan) {
  return {
    type: 'SET_FLOOR_PLAN',
    payload: data
  }
}

export function emptyDetailsReducer() {
  return {
    type: 'EMPTY_DETAILS_REDUCER'
  }
}
