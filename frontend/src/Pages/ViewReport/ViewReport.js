import React, { useEffect, useState } from "react";
import CalculationsTable from "../Calculations/CalculationsTable";
import InputsTable from "../Results/InputsTable";
import AccountNoTable from "../Results/AccountNoTable";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Spin } from "antd";
import { apiUrl, handleError } from "../../util/util.js";
import "./ViewReport.css";

const ViewReport = () => {
  const { reportId } = useParams();
  const [loading, setLoading] = useState(false); // displaying 'loading' sign
  const [report, setReport] = useState({});

  async function getReport() {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/getReport/${reportId}`,{}, { withCredentials: true });
      const output = response.data.response;
      setReport(output);
    } catch (e) {
      handleError(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    getReport();
  }, []);

  const generatePDF = () => {
    window.print();
  }

  return (
    <div className="print-area">
      <h2 className="heading">
        You are checking out report with id {reportId}
      </h2>
      <Spin spinning={loading}>
        {Object.keys(report).length !== 0 && ( //we render tables only when report object is not empty
          <>
            <InputsTable inputsObj={report.input}/>
            <CalculationsTable
              calculationsObj={report.calculation}
            />
            <AccountNoTable
              accNumbersObj={report.accNumbers}
              inputsObj={report.input}
              calculationsObj={report.calculation}
            />
          </>
        )}
        <div className="submit-btn-div">
          <Button className="noprint" onClick={generatePDF}>Print or download</Button>
        </div>
      </Spin>
    </div>
  );
};

export default ViewReport;
