import React from "react";
import { Table } from "antd";

const CalculationsTable = ({ calculationsObj }) => {
  const columns = [
    {
      title: <b>Beregning</b>,
      dataIndex: "beregning",
      key: "beregning",
    },
    {
      title: <b>Afgifter, DKK</b>,
      dataIndex: "afgifter",
      key: "agifter",
    },
  ];

  const data = [
    {
      key: "1",
      beregning: <u>Elforbrug</u>,
    },

    {
      key: "2",
      beregning: "Afgifter på elektricitet i alt",
      afgifter: calculationsObj.taxes_total_el,
    },

    {
      key: "3",
      beregning: "- Heraf ikke godtgørelsesberettiget minimumsafgift",
      afgifter: calculationsObj.not_reimb_tax,
    },

    {
      key: "4",
      beregning: "Moms",
      afgifter: calculationsObj.vat_el,
    },

    {
      key: "5",
      beregning: <b>Elafgifter og moms</b>,
      afgifter: <b>{calculationsObj.el_and_vat}</b>,
    },

    {
      key: "5.5",
    },

    {
      key: "6",
      beregning: <u>Vandforbrug</u>,
    },

    {
      key: "7",
      beregning: "Afgifter på vand i alt",
      afgifter: calculationsObj.taxes_water_total,
    },

    {
      key: "8",
      beregning: "Moms",
      afgifter: calculationsObj.vat_water,
    },

    {
      key: "9",
      beregning: <b>Vandafgift og moms</b>,
      afgifter: <b>{calculationsObj.water_and_vat}</b>,
    },

    {
      key: "9.5",
    },

    {
      key: "10",
      beregning: <b>Afgifter og moms i alt</b>,
      afgifter: <b>{calculationsObj.taxes_and_vat_total}</b>,
    },

    {
      key: "11",
      beregning: "Afgifter og moms i alt",
      afgifter: calculationsObj.reimb_el_tax,
    },

    {
      key: "12",
      beregning: "Godtgørelse af vandafgift",
      afgifter: calculationsObj.reimb_water_tax,
    },

    {
      key: "13",
      beregning: "Momsfradrag af elafgift",
      afgifter: calculationsObj.deduct_el_tax,
    },

    {
      key: "14",
      beregning: "Momsfradrag af vandafgift",
      afgifter: calculationsObj.deduct_water_tax,
    },

    {
      key: "15",
      beregning: <b>Godtgjorte afgifter og moms i alt</b>,
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
        className="calculations-table"
        pagination={false}
        columns={columns}
        dataSource={data}
        size="small"
      />
    </>
  );
};

export default CalculationsTable;
