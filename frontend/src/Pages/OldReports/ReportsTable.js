import React from "react";
import { Space, Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

const ReportsTable = ({ oldReports }) => {
  const navigate = useNavigate();

  const navigateToReport = (report_id) => {
    navigate(`/viewReport/${report_id}`);
  };

  const columns = [
    {
      title: "Report ID",
      dataIndex: "report_id",
      key: "report_id",
    },
    {
      title: "Company name",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Created on",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Consumption periode",
      dataIndex: "consumption_periode",
      key: "consumption_periode",
    },
    {
      title: "Reimbursed taxes and VAT in total",
      dataIndex: "reimb_tax_and_vat",
      key: "reimb_tax_and_vat",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => navigateToReport(record.report_id)}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  function getTableData(oldReports) {
    const data = [];
    oldReports.forEach((report) => {
      data.push({
        key: report.report_id,
        report_id: report.report_id,
        company_name: report.company_name,
        date: report.report_date,
        consumption_periode: report.consumption_periode,
        reimb_tax_and_vat: report.reimb_tax_and_vat
      });
    });
    return data;
  }

  return (
    <>
      <Table bordered columns={columns} dataSource={getTableData(oldReports)} />{" "}
    </>
  );
};

export default ReportsTable;
