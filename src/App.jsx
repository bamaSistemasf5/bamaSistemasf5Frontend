
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from "./pages/Login/Login.jsx"
import  Dashboard  from './pages/Dashboard/Dashboard.jsx';
import Sidebar from '../src/components/Sidebar/Sidebar.jsx'

function App() {


  return (
    <>
      <BrowserRouter>
      <Sidebar/>
      <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/Dashboard' element={<Dashboard />} />
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
