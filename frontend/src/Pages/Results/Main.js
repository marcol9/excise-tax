import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Spin, notification } from "antd";
import axios from "axios";
import InputsTable from "./InputsTable";
import CalculationsTable from "../Calculations/CalculationsTable";
import AccountNoTable from "./AccountNoTable";
import "./Results.css";
import { handleError, apiUrl } from "../../util/util";


const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // displaying 'loading' sign

   //geting objects from previous pages
  const {inputsObj, calculationsObj, accNumbersObj} = location.state

  const sendReport = async () => {
    //sending all data to backend
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/createReport`, {
        calculationsObj,
        inputsObj,
        accNumbersObj,
      },{ withCredentials: true });
      const {report_id} = response.data.response;
      openNotification("success", report_id);
      //navigateToOldReports();
      navigateToReport(report_id);
    } catch (e) {
      handleError(e);
    }
    setLoading(false);
  }

  function openNotification(type, report_id) {
    //notification in the top right corner
    if (type === "success") {
      notification[type]({
        message: "Success",
        description: `The report has been created with id ${report_id}`,
      });
    }
  }
  const navigateToReport = (report_id) => {
    navigate(`/viewReport/${report_id}`);
  };

  const goBack = () => {
    navigate("/AccountNoInput", {
      state: { calculationsObj, inputsObj, accNumbersObj },
    });
  }

  return (
    <>
      <h2 className="heading">Please review and approve the data</h2>

      <InputsTable inputsObj={inputsObj}/>
      <CalculationsTable calculationsObj={calculationsObj}/>
      <AccountNoTable
        accNumbersObj={accNumbersObj}
        inputsObj={inputsObj}
        calculationsObj={calculationsObj}
      />
      <Spin spinning={loading}>
        <div className="submit-btn-div">
          <Button
            type="primary"
            className="next-step-btn"
            onClick={sendReport}
          >
            Create report
          </Button>
          <Button
            type="secondary"
            className="go-back-btn"
            onClick={goBack}
          >
            Go back
          </Button>
        </div>
      </Spin>
    </>
  );
};

export default Results;
