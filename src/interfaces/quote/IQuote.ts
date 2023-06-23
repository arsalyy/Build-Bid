export interface BreakdownItem {
  name: string
  label: string
  cost: number
  breakdown: BreakdownItem[]
  perMarla?: number
  options?: {
    [key: string]: number
  }
  unit?: string
  _id?: string
}

export interface Quote {
  price: number
  range: {
    min: number
    max: number
  }
  breakdown: BreakdownItem[]
}

export interface FloorPlan {
  bedroom: number
  bathroom: number
  livingRoom: number
  kitchen: number
  drawingRoom: number
  carParkingSpace: number
}

export interface GeneralQuestions {
  storey: string
  brick: string
  sand: string
  cement: string
  crush: string
  plumbing: string
  electric: string
}

export interface SecurityQuestions {
  considerationsOrChallenges: string
  permitsOrApprovals: string
  restrictionsOrRegulations: string
}

export interface IQuote {
  user: string
  quote: Quote
  area: number
  areaInMarla: number
  floorPlan: FloorPlan
  generalQuestions: GeneralQuestions
  securityQuestions: SecurityQuestions
  _id: string
}

export interface IQuotePayload {
  user: string
  area: number
  areaInMarla: number
  floorPlan: FloorPlan
  generalQuestions: GeneralQuestions
  securityQuestions: SecurityQuestions
}

export interface IQuoteReducer extends IQuote {}
