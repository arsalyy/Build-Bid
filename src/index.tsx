import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { Box, styled, ThemeProvider, CssBaseline } from '@material-ui/core'
import { persistStore } from 'redux-persist'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import App from './App'
import { store } from './store/ReduxStore'
import './index.css'
import './styles/global.scss'
import { getTheme } from 'utilities/theme'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { ToastProvider } from 'react-toast-notifications'

const AllAppWrapper = styled(Box)({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#FFFFFF'
})

const AppContainer = styled(Box)({
  maxWidth: '1600px',
  height: '100%',
  width: '100%'
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const persistor = persistStore(store)

root.render(
  <AllAppWrapper>
    <AppContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={getTheme({})}>
            <CssBaseline />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
              rel="stylesheet"
            />
            <BrowserRouter>
              <ToastProvider autoDismiss={true} newestOnTop={true}>
                <App />
              </ToastProvider>
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </AppContainer>
  </AllAppWrapper>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
