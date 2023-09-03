import { IAdminReducer } from '../interfaces/admin/IAdmin'

const initialState: IAdminReducer = {
  loggedIn: false
}

export function adminReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return {
        ...state,
        loggedIn: action.payload
      }
    default:
      return state
  }
}
