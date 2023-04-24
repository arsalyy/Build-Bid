import { IUserReducer } from 'interfaces/user/IUser'

export function setUser(data: IUserReducer) {
  return {
    type: 'SET_USER_REDUCER',
    payload: data
  }
}
