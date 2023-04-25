import { IUserReducer } from '../interfaces/user/IUser'

const initialState: IUserReducer = {
  id: '',
  name: '',
  email: '',
  type: '',
  verified: false
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_REDUCER':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_VERIFIED':
      return {
        ...state,
        verified: action.payload
      }
    default:
      return state
  }
}
