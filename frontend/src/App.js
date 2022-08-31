import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import './App.css'
import {FileAddOutlined,FolderOpenOutlined } from '@ant-design/icons';
import logo from './Deloitte-logo.svg'
import Home from './Components/Home/Main'
import NewReportInput from './Components/NewReportInput/Main';
import OldReports from './Components/OldReports/Main';
import Calculations from './Components/Calculations/Main';
import AccountNoInput from './Components/AccountNoInput/Main';
import Results from './Components/Results/Main';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";




const App = () => (
  <div>

    <div className='header'
      style={{
        zIndex: 1,
        width: '100%',
      }}
    >

      <Router>
        
        <Menu mode="horizontal" >

          <Menu.Item key="logo" >
            <NavLink to='/'>
              <img src={logo} width='110'></img>
            </NavLink>
          </Menu.Item>
        
          <Menu.Item 
           key="newReport" icon={<FileAddOutlined />}>
            <NavLink to='/NewReport'> 
              New report
            </NavLink>
          </Menu.Item>
        
          <Menu.Item key="oldReports" icon={<FolderOpenOutlined />}>
            <NavLink to='/OldReports'> 
              Old Reports
            </NavLink>
          </Menu.Item>

        </Menu>

        <Routes>
          <Route path="/NewReport" element={<NewReportInput/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path='/OldReports' element={<OldReports/>}/> 
          <Route path='/Calculations' element={<Calculations/>}/> 
          <Route path='/AccountNoInput' element={<AccountNoInput/>}/> 
          <Route path='/Results' element={<Results></Results>}/>
        </Routes>

      </Router>

    </div>

    
    <div className='footer'
      style={{
        textAlign: 'center',
      }}
    >
      Deloitte ©2022 
    </div>
  </div>
);

export default App;