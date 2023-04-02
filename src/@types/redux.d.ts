/* eslint-disable no-unused-vars */
import 'react-redux'
import { StoreState } from 'reducers/rootReducer'

declare module 'react-redux' {
  interface DefaultRootState extends StoreState {}
}
