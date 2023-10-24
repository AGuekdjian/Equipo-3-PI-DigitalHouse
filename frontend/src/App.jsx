import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import {
  Layout,
  Home,
  Detail,
  AdminDashboard,
  Login,
  RegistrarProducto,
  Reserve,
  Signup
} from "./Routes/Layout"
import Navbar from "./Components/Navbar"
import { GlobalContextProvider } from './context'

function App() {


  return (

    <>
      <Router>
        <GlobalContextProvider>

          <Layout>
            <Navbar />
            <Routes>

              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/Signup' element={<Signup/>}/>
              <Route path='/productonuevo' element={<RegistrarProducto/>}/>
              <Route path='/reservar' element={<Reserve/>}/>
              <Route path='/detail/:id' element={<Detail/>}/> 
              <Route path='/administracion' element={<AdminDashboard/>}/>

            </Routes>
          </Layout>


        </GlobalContextProvider>
      </Router>
    </>


  )
}

export default App
