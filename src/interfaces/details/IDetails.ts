export interface IOption {
  id: string
  value: string
}

export interface IStatement {
  type: 'statement'
  varinat: 'double' | 'triple'
  id: string
  title: string
  answer?: string
  options: Array<IOption>
}

export type IDetails = IStatement

export interface IFloorPlan {
  bedroom: number
  bathroom: number
  livingRoom: number
  kitchen: number
  drawingRoom: number
  carParkingSpace: number
}

export interface IDetailsReducer {
  generalQuestions: IDetails[]
  securityQuestions: IDetails[]
  floorPlan: IFloorPlan
}
