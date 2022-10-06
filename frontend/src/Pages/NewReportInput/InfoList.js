import React, { useEffect, useState } from "react";
import classes from "./NewReportInput.module.css";
import axios from "axios";
import { apiUrl,handleError } from "../../util/util";
import { Spin } from "antd";

const InfoList = () => {
  const [loading,setLoading] = useState(true);
  const [prerequisites, setPrerequisites] = useState([]);

  const fetchPrerequisites = async () =>{
    try{
    const response = await axios.post(`${apiUrl}/getPrerequisites`,{}, { withCredentials: true });
    const data = response.data.response;
    const dataArray = data.map(value => value.prerequisite)
    setPrerequisites(dataArray)
    }catch(e){
        handleError(e)
    }
    setLoading(false)
  }  

  useEffect(() =>{
    fetchPrerequisites()
  }, []);

  return (
    <>
    <Spin spinning={loading}>
    <ul>
    {prerequisites.map((value,index) =>{
      return (
        <li key={index}>{value} </li>
      )
    })}
    <h4 className={classes.contact}><b>If your company does not meet the above prerequisites please contact Deloitte, cf. the contact information below.</b></h4>
    </ul>
    </Spin>
    </>
  );
};

export default InfoList;
