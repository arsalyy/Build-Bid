import { IStartReducer } from './start/IStart'
import { IUserReducer } from './user/IUser'
import { IAdminReducer } from './admin/IAdmin'

export interface IReduxState {
  adminReducer: IAdminReducer
  startReducer: IStartReducer
  userReducer: IUserReducer
}
