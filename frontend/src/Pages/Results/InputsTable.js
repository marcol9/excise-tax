import React from "react";
import { Table } from "antd";

const InputsTable = ({ inputsObj }) => {
  const columns = [
    {
      title: <b>Entry</b>,
      dataIndex: "Indtastning",
      key: "Indtastning",
    },
    {
      title: <b>Value</b>,
      dataIndex: "value",
      key: "value",
    },
  ];

  const data = [
    {
      key: "8",
      Indtastning: "Company name",
      value: inputsObj.company_name,
    },
    {
      key: "1",
      Indtastning: "Year of consumption",
      value: inputsObj.consumption_periode,
    },

    {
      key: "2",
      Indtastning: "Payment for electricity according to invoice, incl. VAT",
      value: Number(inputsObj.el_invoice_amount), //making sure that it is treated as number
    },

    {
      key: "3",
      Indtastning: "kWh consumption for the period",
      value: Number(inputsObj.period_consumption_kwh),
    },

    {
      key: "4",
      Indtastning:
        "Hereof calculated consumption for comfort cooling, room heating and hot water. Only relevant before 1 January 2021",
      value: Number(inputsObj.calculated_chw),
    },

    {
      key: "5",
      Indtastning: "Payment for water according to invoice, incl. VAT",
      value: Number(inputsObj.water_invoice_amount),
    },

    {
      key: "6",
      Indtastning: "M3 consumption for the period",
      value: Number(inputsObj.period_consumption_m3),
    },

    {
      key: "7",
      Indtastning: "General VAT deduction rate for the period",
      value: Number(inputsObj.vat_percentage),
    },
  ];

  return (
    <>
      <Table
        className="inputs-table"
        pagination={false}
        bordered
        columns={columns}
        dataSource={data}
        size="small"
      ></Table>
    </>
  );
};

export default InputsTable;
