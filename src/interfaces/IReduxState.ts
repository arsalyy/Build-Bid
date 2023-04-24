import { IStartReducer } from './start/IStart'
import { IUserReducer } from './user/IUser'

export interface IReduxState {
  startReducer: IStartReducer
  userReducer: IUserReducer
}
