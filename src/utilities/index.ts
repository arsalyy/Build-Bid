import { IReduxState } from 'interfaces/IReduxState'
import { IFloorPlan } from 'interfaces/details/IDetails'
import qs from 'query-string'

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

export const getQuotePayload = (state: IReduxState) => {
  return {
    user: state.userReducer.id,
    area: state.startReducer.area,
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
