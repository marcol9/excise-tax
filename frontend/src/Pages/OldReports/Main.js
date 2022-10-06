import React, { useEffect } from "react";
import { Spin } from "antd";
import { useState } from "react";
import axios from "axios";
import "./OldReports.css";
import ReportsTable from "./ReportsTable";
import { handleError, apiUrl } from "../../util/util.js";

const OldReports = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);

  async function getReports(user_id) {
    try {
      const response = await axios.post(`${apiUrl}/getReports/${user_id}`,{}, { withCredentials: true });
      const reports = response.data.response;
      setData(reports);
    } catch (e) {
      handleError(e);
    }
    setInitLoading(false);
  }

  useEffect(() => {
    getReports(1);
  }, []);

  return (
    <>
    <h1 className="heading">Old reports</h1>
    <div className="center">
      <Spin spinning={initLoading}>
        <ReportsTable oldReports={data}/>
      </Spin>
    </div>
    </>
  );
};

export default OldReports;
