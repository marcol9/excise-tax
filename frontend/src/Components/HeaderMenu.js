import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  FileAddOutlined,
  FolderOpenOutlined,
  EditOutlined,
  LoginOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import logo from "../Deloitte-logo.svg";
import jwt_decode from 'jwt-decode'
import { getCookie } from "../util/util.js";


const HeaderMenu = () => {
  let menuItems = [
    {
      name: <img alt="" src={logo} width="110"></img>,
      link: "/",
    },
    {
      name: "New report",
      link: "/NewReport",
      icon: <FileAddOutlined />,
    },
    {
      name: "Old reports",
      link: "/OldReports",
      icon: <FolderOpenOutlined />,
    },
    {
      name: "Manage tax data",
      link: "/ManageTaxData",
      icon: <EditOutlined />,
    },
    
    {
      name: "Update prerequisites",
      link: "/UpdatePrerequisites",
      icon: <EditOutlined />,
    },
    {
      name: "Log in",
      link: "/login",
      icon: <LoginOutlined />,
      style: {marginLeft: 'auto'}
    },
    {
      name: "Log out",
      link: "/logout",
      icon: <LogoutOutlined />,
      style: {marginLeft: 'auto'}
    }
  ];
  
  const location = useLocation();
  const jwtCookie = getCookie('jwt')
  let jwtData = {};

  if(typeof jwtCookie === "string"){
    jwtData = jwt_decode(jwtCookie); // if we have cookie, user is logged in
    menuItems = menuItems.filter(value => value.name !== "Log in");
    if(jwtData.role !== "admin"){
      menuItems = menuItems.filter(value => value.name !== "Manage tax data" && value.name !== "Update prerequisites")
    }
  }else{
    //if we dont have cookie, user is not logged in
    menuItems = [
      {
        name: <img alt="" src={logo} width="110"></img>,
        link: "/",
      },
      {
      name: "Log in",
      link: "/login",
      icon: <LoginOutlined />,
      style: {marginLeft: 'auto'}
    }]
  }
  
  return (
    <Menu className="noprint" selectedKeys={[location.pathname]} mode="horizontal">
      {menuItems.map(({link,icon,name,style}) => (
        <Menu.Item style={style} key={link} icon={icon}>
          <Link to={link}>{name}</Link>
        </Menu.Item>
      ))}
      <Menu.Item key='username'disabled={true}>
        {jwtData.email}
      </Menu.Item>
    </Menu>
  );
};
export default HeaderMenu;
