import { IDetailsReducer } from 'interfaces/details/IDetails'
import { IStartReducer } from 'interfaces/start/IStart'
import { getDetailsData } from '../constants'

export const validateStartPage = (state: IStartReducer) => {
  if (!state) return false

  if (!state.area) return false

  return true
}

export const validateDetailsPageStep1 = (state: IDetailsReducer) => {
  if (!state) return false

  const { generalQuestions } = getDetailsData()
  if (generalQuestions.length !== state.generalQuestions.length) return false

  for (const q of state.generalQuestions) {
    if (!q.answer) return false
  }

  return true
}

export const validateDetailsPageStep2 = (state: IDetailsReducer) => {
  if (!state) return false

  if (!state.floorPlan) return false

  if (
    !state.floorPlan.bathroom ||
    !state.floorPlan.bedroom ||
    !state.floorPlan.carParkingSpace ||
    !state.floorPlan.drawingRoom ||
    !state.floorPlan.kitchen ||
    !state.floorPlan.livingRoom
  )
    return false

  return true
}

export const validateDetailsPageStep3 = (state: IDetailsReducer) => {
  if (!state) return false

  const { securityQuestions } = getDetailsData()
  if (securityQuestions.length !== state.securityQuestions.length) return false

  for (const q of state.securityQuestions) {
    if (!q.answer) return false
  }

  return true
}
