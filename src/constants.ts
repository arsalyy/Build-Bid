export const USERS_ENDPOINT = 'http://localhost:4000/api/users'
export const ADMIN_ENDPOINT = 'http://localhost:4000/api/admin'
export const QUOTE_ENDPOINT = 'http://localhost:4000/api/quote'

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
