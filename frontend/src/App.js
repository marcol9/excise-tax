import React, { useState } from 'react';
import './App.css'
import Home from './Pages/Home/Main'
import NewReportInput from './Pages/NewReportInput/Main';
import OldReports from './Pages/OldReports/Main';
import Calculations from './Pages/Calculations/Main';
import AccountNoInput from './Pages/AccountNoInput/Main';
import Results from './Pages/Results/Main';
import HeaderMenu from './Components/HeaderMenu.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ViewReport from './Pages/ViewReport/ViewReport';
import ManageTaxData from './Pages/ManageTaxData/Main';
import AddTaxData from './Pages/AddTaxData/Main';
import UpdateTaxData from './Pages/UpdateTaxData/Main.js';
import Footer from './Components/Footer';
import UpdatePrerequisites from './Pages/UpdatePrerequisites/Main';
import LogIn from './Pages/Login/Main';
import LogOut from './Pages/Logout/Main';
import { getCookie } from './util/util';
import jwt_decode from "jwt-decode"
import Protected from './Components/Protected';
import ProtectedAdmin from './Components/ProtectedAdmin';
import { useCookies } from 'react-cookie';

const App = () => {

  const [update, setUpdate] = useState(null);

  const jwtCookie = getCookie('jwt')
  let jwtData = {};
  let role;
  if(typeof jwtCookie === "string"){
    jwtData = jwt_decode(jwtCookie); // if we have cookie, user is logged in
    if(jwtData.role === "user"){
      role = "user"
    }
    if(jwtData.role === "admin"){ //if role is admin
      role = "admin"
    }
  }else{
    //if we dont have cookie, user is not logged in
    role = "unauth"
  }

  return (
  <div className='flex-wrapper'>

    <div className='header'
      style={{
        zIndex: 1,
        width: '100%',
      }}
    >

      <Router>
        
        <HeaderMenu></HeaderMenu>

        <Routes>
          <Route path="/NewReport" element={<Protected role={role}> <NewReportInput/> </Protected>}/>
          <Route path="/" element={<Home/>}/>
          <Route path='/OldReports' element={<Protected role={role}> <OldReports/> </Protected>}/> 
          <Route path='/Calculations' element={<Protected role={role}> <Calculations/> </Protected>}/> 
          <Route path='/AccountNoInput' element={<Protected role={role}> <AccountNoInput/> </Protected>}/> 
          <Route path='/Results' element={<Protected role={role}> <Results/> </Protected>}/>
          <Route path='/viewReport/:reportId' element={<Protected role={role}> <ViewReport/> </Protected>}/>
          <Route path='/ManageTaxData' element={<ProtectedAdmin role={role}> <ManageTaxData/> </ProtectedAdmin>}/>
          <Route path='/AddTaxData' element={<ProtectedAdmin role={role}> <AddTaxData/> </ProtectedAdmin>}/>
          <Route path='/updateTaxData/:taxDataId' element={<ProtectedAdmin role={role}> <UpdateTaxData/> </ProtectedAdmin>}/>
          <Route path='/UpdatePrerequisites' element={<ProtectedAdmin role={role}> <UpdatePrerequisites/> </ProtectedAdmin>}/>
          <Route path='/login' element={<LogIn setUpdate={setUpdate}/>}/>
          <Route path='/logout' element={<LogOut setUpdate={setUpdate}/>}/>
        </Routes>

      </Router>

    </div>

      <Footer></Footer>
    
  </div>
  );
};

export default App;