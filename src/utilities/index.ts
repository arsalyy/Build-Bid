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
