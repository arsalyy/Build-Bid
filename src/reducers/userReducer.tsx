import { IUserReducer } from '../interfaces/user/IUser'

const initialState: IUserReducer = {
  id: '',
  name: '',
  email: '',
  type: ''
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_REDUCER':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
