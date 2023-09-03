import { IDetails, IFloorPlan } from 'interfaces/details/IDetails'

export const USERS_ENDPOINT = 'http://localhost:4000/api/users'
export const ADMIN_ENDPOINT = 'http://localhost:4000/api/admin'
export const QUOTE_ENDPOINT = 'http://localhost:4000/api/quote'
export const BID_ENDPOINT = 'http://localhost:4000/api/bid'
export const PROJECT_ENDPOINT = 'http://localhost:4000/api/project'
export const PRICES_ENDPOINT = 'http://localhost:4000/api/prices'

export const ROUTES = {
  Home: '/',
  Start: '/start',
  Details: '/details',
  Quote: '/quote'
}

export const ROUTES_VALIDATION_STEPS = [
  { path: ROUTES.Home, id: 0 },
  { path: ROUTES.Start, id: 1 },
  { path: ROUTES.Details, id: 2 },
  { path: ROUTES.Quote, id: 3 }
]

export const getDetailsData = () => {
  const generalQuestions: IDetails[] = [
    {
      id: '7043cced-59c4-46d3-970b-0a008ca4db6b',
      type: 'statement',
      varinat: 'double',
      title: 'Are you planning to build a single-storey house or a double-storey house?',
      options: [
        { id: 'single', value: 'Single' },
        { id: 'double', value: 'Double' }
      ]
    },
    {
      id: '233363bb-aaa7-4cd1-8cdd-b9f3b3ad8252',
      type: 'statement',
      varinat: 'double',
      title: 'Which source of crush would you prefer to use for your project?',
      options: [
        { id: 'margala', value: 'Margala' },
        { id: 'sarghoda', value: 'Sarghoda' }
      ],
      tooltip: true
    },
    {
      id: '66ce5487-a027-40fc-95d0-2daab1a3b008',
      type: 'statement',
      varinat: 'triple',
      title: 'Which grade of bricks would you prefer to use for your project?',
      options: [
        { id: 'gradeA', value: 'Grade - A ' },
        { id: 'gradeB', value: 'Grade - B' },
        { id: 'gradeC', value: 'Grade - C' }
      ],
      tooltip: true
    },
    {
      id: '0514056a-d1e2-47ae-9aeb-b7e6fdeaaa6f',
      type: 'statement',
      varinat: 'double',
      title: 'Which source of sand would you prefer to use for your project?',
      options: [
        { id: 'ravi', value: 'Ravi' },
        { id: 'chenab', value: 'Chenab' }
      ],
      tooltip: true
    },
    {
      id: '6e4422eb-6461-412c-8e16-c29bdfa2035b',
      type: 'statement',
      varinat: 'triple',
      title: 'Which brand of cement would you like to use for your project?',
      options: [
        { id: 'lucky', value: 'Lucky Cement' },
        { id: 'dg', value: 'DG Cement' },
        { id: 'mapleLeaf', value: 'Maple Leaf' }
      ],
      tooltip: true
    },
    {
      id: '5680e43a-9a1c-4a30-8213-ebeca5e3651e',
      type: 'statement',
      varinat: 'double',
      title: 'Do you want to include the electric wiring and plumbing cost in your estimation?',
      options: [
        { id: 'yes', value: 'Yes' },
        { id: 'no', value: 'No' }
      ]
    }
  ]

  const securityQuestions: IDetails[] = [
    {
      id: '1aec2bfe-b6c5-49a0-bb67-e3062f9dc269',
      type: 'statement',
      varinat: 'double',
      title: 'Are there any special considerations or challenges that need to be taken into account for the construction?',
      options: [
        { id: 'yes', value: 'Yes' },
        { id: 'no', value: 'No' }
      ]
    },
    {
      id: 'e7479f55-b9da-42f1-94b4-550bc0fff2b5',
      type: 'statement',
      varinat: 'double',
      title: 'Have you obtained any necessary permits or approvals for the construction project?',
      options: [
        { id: 'yes', value: 'Yes' },
        { id: 'no', value: 'No' }
      ]
    },
    {
      id: '7afd3acd-584b-44da-ab2d-0a9a0f87b421',
      type: 'statement',
      varinat: 'double',
      title:
        'Are there any restrictions or regulations regarding setbacks or house heights that need to be adhered to on the site?',
      options: [
        { id: 'yes', value: 'Yes' },
        { id: 'no', value: 'No' }
      ]
    }
  ]

  return { generalQuestions, securityQuestions }
}

export const getFloorPlan = (marla: number): IFloorPlan => {
  switch (true) {
    case marla >= 3 && marla < 5:
      return {
        bedroom: 3,
        bathroom: 4,
        kitchen: 2,
        livingRoom: 2,
        carParkingSpace: 1,
        drawingRoom: 1
      }
    case marla >= 5 && marla < 10:
      return {
        bedroom: 4,
        bathroom: 5,
        kitchen: 2,
        livingRoom: 2,
        carParkingSpace: 2,
        drawingRoom: 1
      }
    case marla >= 10 && marla < 15:
      return {
        bedroom: 5,
        bathroom: 7,
        kitchen: 2,
        livingRoom: 2,
        carParkingSpace: 3,
        drawingRoom: 1
      }
    case marla >= 15 && marla <= 20:
      return {
        bedroom: 7,
        bathroom: 9,
        kitchen: 2,
        livingRoom: 2,
        carParkingSpace: 4,
        drawingRoom: 1
      }
    case marla > 20:
      return {
        bedroom: 7,
        bathroom: 9,
        kitchen: 2,
        livingRoom: 2,
        carParkingSpace: 4,
        drawingRoom: 1
      }
    default:
      return {} as IFloorPlan
  }
}

export const units = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion']
export const words = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen'
]
export const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
