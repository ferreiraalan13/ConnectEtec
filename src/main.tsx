import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SignUp from './pages/sign-up/SignUp.tsx'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <App/>
    </ChakraProvider>
  </React.StrictMode>,
)
