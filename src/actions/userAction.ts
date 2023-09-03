import { IUserReducer } from 'interfaces/user/IUser'

export function setUser(data: IUserReducer) {
  return {
    type: 'SET_USER_REDUCER',
    payload: data
  }
}

export function setVerified(data: boolean) {
  return {
    type: 'SET_VERIFIED',
    payload: data
  }
}

export function setIdentityVerified(data: boolean) {
  return {
    type: 'SET_IDENTITY_VERIFIED',
    payload: data
  }
}

export function setWaiting(data: boolean) {
  return {
    type: 'SET_WAITING',
    payload: data
  }
}
