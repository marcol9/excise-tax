import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spin } from "antd";
import { handleError, apiUrl } from "../../util/util.js";
import TaxDataTable from "./TaxDataTable.js";
import "./ManageTaxData.css";
import { useNavigate } from "react-router-dom";

const ManageTaxData = () => {
  const navigate = useNavigate()

  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const[update, setUpdate] = useState(false); //using that state to update this component after deleting 

  async function fetchTaxData() {
    try {
      const response = await axios.post(`${apiUrl}/getTaxData`,{}, { withCredentials: true });
      const taxData = response.data.response;
      setData(taxData);
    } catch (e) {
      handleError(e);
    }
    setInitLoading(false);
  }

  if(update === true){ //check if component needs to be updated
    fetchTaxData();
    setUpdate(false)
  }

  useEffect(() => {
    fetchTaxData();
  }, []);

  const navigateToAddTaxData = () =>{
    navigate('/addTaxData')
  }

  return (
    <>
      <h1 className="heading">Manage tax data</h1>

      <div className="center-manage">
        <Spin spinning={initLoading}>
          <TaxDataTable taxData={data} update={update} setUpdate={setUpdate}/>
        </Spin>
        <Button type="primary" onClick={navigateToAddTaxData}>Add new tax data</Button>
      </div>
    </>
  );
};
export default ManageTaxData;
