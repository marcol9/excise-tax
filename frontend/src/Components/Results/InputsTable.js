import React from "react";
import { Table } from "antd";

const InputsTable = ({ inputsObj }) => {

  const columns = [
    {
      title: <b>Indtastning</b>,
      dataIndex: "Indtastning",
      key: "Indtastning",
    },
    {
      title: <b>Værdi</b>,
      dataIndex: "value",
      key: "value",
    },
  ];

  const data = [
    {
      key: "1",
      Indtastning: "Vælg årstal for forbrug (2019-2022)",
      value: inputsObj.consumption_periode,
    },

    {
      key: "2",
      Indtastning: "El fakturabeløb inkl. moms",
      value: inputsObj.el_invoice_amount,
    },

    {
      key: "3",
      Indtastning: "Periodens forbrug i kWh",
      value: inputsObj.period_consumption_kwh,
    },

    {
      key: "4",
      Indtastning:
        "Heraf opgjort forbrug til komfortkøling, opvarmning af rum og varmt vand, dog alene relevant før 1. januar 2021",
      value: inputsObj.calculated_chw,
    },

    {
      key: "5",
      Indtastning: "Vand fakturabeløb inkl. moms",
      value: inputsObj.water_invoice_amount,
    },

    {
      key: "6",
      Indtastning: "Periodens forbrug i M3",
      value: inputsObj.period_consumption_m3,
    },

    {
      key: "7",
      Indtastning: "Periodens generelle momsfradragsprocent",
      value: inputsObj.vat_percentage,
    },
  ];

  return (
    <>
      <Table
        className="inputs-table"
        pagination={false}
        columns={columns}
        dataSource={data}
        size="small"
      ></Table>
    </>
  );
};

export default InputsTable;
