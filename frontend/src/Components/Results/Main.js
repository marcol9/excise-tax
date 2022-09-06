import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";
import InputsTable from "./InputsTable";
import CalculationsTable from "../Calculations/CalculationsTable";
import AccountNoTable from "./AccountNoTable";
import "./Results.css";
import { notification } from "antd";

const apiUrl = process.env.REACT_APP_API_URL;

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const inputsObj = location.state.inputsObj;
  const calculationsObj = location.state.calculationsObj;
  const accNumbersObj = location.state.accNumbersObj;

  async function sendReport() {
    try{
    const response = await axios.post(apiUrl + "/createReport", {
      calculationsObj,
      inputsObj,
      accNumbersObj,
    });
    if (response.statusText === "OK") {
      const report_id = response.data.response.report_id;
      openNotificationWithIcon("success", report_id);
      navigateToOldReports();
    }
    }catch{
        openNotificationWithIcon("error");
    }
  }

  function openNotificationWithIcon(type, report_id) {
    if (type === "success") {
      notification[type]({
        message: "Success",
        description: `The report has been created with id ${report_id}`,
      });
    }
    if(type === 'error'){
        notification[type]({
            message: 'Error',
            description: 'The report has not been created. Contact admin or try again.',
        })
    }
  }

  function navigateToOldReports() {
    navigate("/OldReports");
  }

  return (
    <>
      <h2 className="heading">Please review and approve the data</h2>

      <InputsTable inputsObj={inputsObj}></InputsTable>
      <CalculationsTable calculationsObj={calculationsObj}></CalculationsTable>
      <AccountNoTable
        accNumbersObj={accNumbersObj}
        inputsObj={inputsObj}
        calculationsObj={calculationsObj}
      ></AccountNoTable>
      <div className="submit-btn-div">
        <Button
          type="primary"
          className="next-step-btn"
          onClick={() => sendReport()}
        >
          {" "}
          Create report
        </Button>
      </div>
    </>
  );
};

export default Results;
