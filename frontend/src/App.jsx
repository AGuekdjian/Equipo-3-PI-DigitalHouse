import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import Layout from "./Routes/Layout"
import Home from "./Routes/Home"
import Detail from "./Routes/Detail"
import AdminDashboard from "./Routes/AdminDashboard"
import Login from "./Routes/Login"
import RegistrarProducto from "./Routes/RegistrarProducto"
import Reserve from "./Routes/Reserve"
import Signup from "./Routes/Signup"
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
