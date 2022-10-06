import React from "react";
import { Table } from "antd";
import classes from "./Calculations.module.css";

const CalculationsTable = ({ calculationsObj }) => {


  const columns = [
    {
      title: <b>Calculation</b>,
      dataIndex: "beregning",
      key: "beregning",
    },
    {
      title: <b>Excise duties, DKK</b>,
      dataIndex: "afgifter",
      key: "afgifter",
    },
  ];

  const data = [
    {
      key: "1",
      beregning: <u>Electricity consumption</u>,
    },

    {
      key: "2",
      beregning: "Electricity excise tax, total",
      afgifter: calculationsObj.taxes_total_el,
    },

    {
      key: "3",
      beregning: "- Hereof non-reimbursable minimum excise duty",
      afgifter: calculationsObj.not_reimb_tax,
    },

    {
      key: "4",
      beregning: "VAT",
      afgifter: calculationsObj.vat_el,
    },

    {
      key: "5",
      beregning: <b>Electricity excise tax and VAT</b>,
      afgifter: <b>{calculationsObj.el_and_vat}</b>,
    },

    {
      key: "5.5",
    },

    {
      key: "6",
      beregning: <u>Water consumption</u>,
    },

    {
      key: "7",
      beregning: "Water excise tax, total",
      afgifter: calculationsObj.taxes_water_total,
    },

    {
      key: "8",
      beregning: "VAT",
      afgifter: calculationsObj.vat_water,
    },

    {
      key: "9",
      beregning: <b>Water excise tax and VAT</b>,
      afgifter: <b>{calculationsObj.water_and_vat}</b>,
    },

    {
      key: "9.5",
    },

    {
      key: "10",
      beregning: <b>Excise taxes and VAT, total</b>,
      afgifter: <b>{calculationsObj.taxes_and_vat_total}</b>,
    },

    {
      key: "11",
      beregning: "Reimbursement of electricity excise tax",
      afgifter: calculationsObj.reimb_el_tax,
    },

    {
      key: "12",
      beregning: "Reimbursement of water excise tax",
      afgifter: calculationsObj.reimb_water_tax,
    },

    {
      key: "13",
      beregning: "VAT deduction of electricity excise tax",
      afgifter: calculationsObj.deduct_el_tax,
    },

    {
      key: "14",
      beregning: "VAT deduction of water excise tax",
      afgifter: calculationsObj.deduct_water_tax,
    },

    {
      key: "15",
      beregning: <b>Reimbursement of excise taxes and VAT, total</b>,
      afgifter: (
        <u>
          <b>{calculationsObj.reimb_tax_and_vat}</b>
        </u>
      ),
    },
  ];

  return (
    <>
      <Table
        className={classes.calculationsT}
        pagination={false}
        bordered
        columns={columns}
        dataSource={data}
        size="small"
      />
    </>
  );
};

export default CalculationsTable;
