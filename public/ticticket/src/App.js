import React from 'react'
import {BrowserRouter,Routes,Route, Router} from "react-router-dom";
import Register from "./pages/register"
import Login from "./pages/login"
import Homee from './pages/homee';
import ARegister from './pages/Aregister';
import ALogin from './pages/Alogin';
import Ahomee from './pages/Ahomee';
import Addshow from './pages/addshow';
import Checur from './pages/checur';
import Seating from './pages/seating';
import Displayticket from './pages/displayticket';
import Historry from './pages/history';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Homee/>}/>
    <Route path='/homee' element={<Homee/>}/>
    <Route path='/ahomee' element={<Ahomee/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/aregister" element={<ARegister/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/alogin" element={<ALogin/>}/>
    <Route path="/addshow" element={<Addshow/>}/>
    <Route path="/checur" element={<Checur/>}/>
    <Route path="/seating" element={<Seating/>}/>
    <Route path="/displayticket" element={<Displayticket/>}/>
    <Route path="/history" element={<Historry/>}/>
    </Routes>
    </BrowserRouter>
  )
}
