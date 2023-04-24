export const USERS_ENDPOINT = 'http://localhost:4000/api/users'

export const ROUTES = {
  Home: '/',
  Start: '/start',
  Quote: '/quote',
  Details: '/details',
  Declarations: '/declarations',
  Payment: '/payment'
}

export const ROUTES_VALIDATION_STEPS = [
  { path: ROUTES.Home, id: 0 },
  { path: ROUTES.Start, id: 1 },
  { path: ROUTES.Quote, id: 2 },
  { path: ROUTES.Details, id: 3 },
  { path: ROUTES.Declarations, id: 4 },
  { path: ROUTES.Payment, id: 5 }
]
