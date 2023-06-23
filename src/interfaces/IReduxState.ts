import { IStartReducer } from './start/IStart'
import { IUserReducer } from './user/IUser'
import { IAdminReducer } from './admin/IAdmin'
import { IDetailsReducer } from './details/IDetails'
import { IQuoteReducer } from './quote/IQuote'

export interface IReduxState {
  adminReducer: IAdminReducer
  startReducer: IStartReducer
  userReducer: IUserReducer
  detailsReducer: IDetailsReducer
  quoteReducer: IQuoteReducer
}
