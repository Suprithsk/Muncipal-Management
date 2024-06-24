import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminHome from './components/AdminHome.jsx'
import AdminProblems from './components/AdminProblems.jsx'
import UserHome from './components/UserHome.jsx'

const router = createBrowserRouter([
  {
    path: "/admin",
    Component: AdminHome
  },
  {
    path: "/",
    Component: UserHome
  },
  {
    path:'/admin/view-problems',
    Component: AdminProblems
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
