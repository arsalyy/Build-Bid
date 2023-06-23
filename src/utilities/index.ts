import { IReduxState } from 'interfaces/IReduxState'
import { IFloorPlan } from 'interfaces/details/IDetails'
import qs from 'query-string'
import { units, words, tens } from '../constants'
import { IQuotePayload, IQuoteReducer } from 'interfaces/quote/IQuote'

export const inputShadowStyle = { WebkitBoxShadow: '0 0 0 1000px white inset' }

export const verifyEmail = (value: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(value)) {
    return false
  } else {
    return true
  }
}

export const parseQuery = (search: string) => {
  return qs.parse(search)
}

export const squareMeterToMarla = (val: string) => {
  const squareMeter = parseFloat(val)
  return parseFloat((squareMeter / 25.293).toFixed(2))
}

export const reduceToSingleStorey = (val: IFloorPlan): IFloorPlan => {
  return {
    ...val,
    bedroom: Math.floor(val.bedroom / 2),
    bathroom: Math.floor(val.bathroom / 2),
    kitchen: Math.floor(val.kitchen / 2),
    livingRoom: Math.floor(val.livingRoom / 2)
  }
}

export const getQuotePayload = (state: IReduxState): IQuotePayload => {
  return {
    user: state.userReducer.id,
    area: Number(state.startReducer.area),
    areaInMarla: squareMeterToMarla(state.startReducer.area),
    floorPlan: state.detailsReducer.floorPlan,
    generalQuestions: {
      storey: state.detailsReducer.generalQuestions.find((q) => q.id === '7043cced-59c4-46d3-970b-0a008ca4db6b')?.answer ?? '',
      brick: state.detailsReducer.generalQuestions.find((q) => q.id === '66ce5487-a027-40fc-95d0-2daab1a3b008')?.answer ?? '',
      cement: state.detailsReducer.generalQuestions.find((q) => q.id === '6e4422eb-6461-412c-8e16-c29bdfa2035b')?.answer ?? '',
      sand: state.detailsReducer.generalQuestions.find((q) => q.id === '0514056a-d1e2-47ae-9aeb-b7e6fdeaaa6f')?.answer ?? '',
      crush: state.detailsReducer.generalQuestions.find((q) => q.id === '233363bb-aaa7-4cd1-8cdd-b9f3b3ad8252')?.answer ?? '',
      plumbing:
        state.detailsReducer.generalQuestions.find((q) => q.id === '5680e43a-9a1c-4a30-8213-ebeca5e3651e')?.answer ?? 'no',
      electric: state.detailsReducer.generalQuestions.find((q) => q.id === '5680e43a-9a1c-4a30-8213-ebeca5e3651e')?.answer ?? 'no'
    },
    securityQuestions: {
      considerationsOrChallenges:
        state.detailsReducer.securityQuestions.find((q) => q.id === '1aec2bfe-b6c5-49a0-bb67-e3062f9dc269')?.answer ?? 'no',
      permitsOrApprovals:
        state.detailsReducer.securityQuestions.find((q) => q.id === 'e7479f55-b9da-42f1-94b4-550bc0fff2b5')?.answer ?? 'no',
      restrictionsOrRegulations:
        state.detailsReducer.securityQuestions.find((q) => q.id === '7afd3acd-584b-44da-ab2d-0a9a0f87b421')?.answer ?? 'no'
    }
  }
}

export const numberToText = (number: number): string => {
  if (number === 0) {
    return 'Zero'
  }
  let text = ''
  let i = 0
  while (number > 0) {
    if (number % 1000 !== 0) {
      let temp = number % 1000
      let tempText = ''
      if (temp >= 100) {
        tempText += words[Math.floor(temp / 100)] + ' Hundred '
        temp = temp % 100
      }
      if (temp >= 20) {
        tempText += tens[Math.floor(temp / 10)] + ' '
        temp = temp % 10
      }
      if (temp > 0) {
        tempText += words[temp] + ' '
      }
      text = tempText + units[i] + ' ' + text
    }
    number = Math.floor(number / 1000)
    i++
  }
  return text.trim() + ' Rupee'
}

export const convertToMillion = (number: number): number => number / 1000000

export const comparePayloadForApiCall = (payload: IQuotePayload, state: IQuoteReducer): boolean => {
  if (Number(payload.area) !== Number(state.area)) return true
  if (Number(payload.areaInMarla) !== Number(state.areaInMarla)) return true

  if (payload.user !== state.user) return true

  if (Number(payload.floorPlan.bathroom) !== Number(state.floorPlan.bathroom)) return true
  if (Number(payload.floorPlan.bedroom) !== Number(state.floorPlan.bedroom)) return true
  if (Number(payload.floorPlan.carParkingSpace) !== Number(state.floorPlan.carParkingSpace)) return true
  if (Number(payload.floorPlan.drawingRoom) !== Number(state.floorPlan.drawingRoom)) return true
  if (Number(payload.floorPlan.kitchen) !== Number(state.floorPlan.kitchen)) return true
  if (Number(payload.floorPlan.livingRoom) !== Number(state.floorPlan.livingRoom)) return true

  if (payload.generalQuestions.brick !== state.generalQuestions.brick) return true
  if (payload.generalQuestions.cement !== state.generalQuestions.cement) return true
  if (payload.generalQuestions.crush !== state.generalQuestions.crush) return true
  if (payload.generalQuestions.electric !== state.generalQuestions.electric) return true
  if (payload.generalQuestions.plumbing !== state.generalQuestions.plumbing) return true
  if (payload.generalQuestions.sand !== state.generalQuestions.sand) return true
  if (payload.generalQuestions.storey !== state.generalQuestions.storey) return true

  if (payload.securityQuestions.considerationsOrChallenges !== state.securityQuestions.considerationsOrChallenges) return true
  if (payload.securityQuestions.permitsOrApprovals !== state.securityQuestions.permitsOrApprovals) return true
  if (payload.securityQuestions.restrictionsOrRegulations !== state.securityQuestions.restrictionsOrRegulations) return true

  return false
}
