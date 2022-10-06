import React, { useState } from "react";
import { Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;

const FormItems = ({ consumptionPeriodes }) => {

  if (consumptionPeriodes == null) return null;

  let options = []; // Array that holds consumption periodes for selector
  consumptionPeriodes.forEach((consumptionPeriode) => {
    const value = consumptionPeriode.consumption_periode;
    options.push(
      <Option key={value} value={value}>
        {value}
      </Option>
    );
  });

  const formatter = (value) =>{
    if(Number.isInteger(value)){
      return value;
    }else{
      return Math.round(value)
    }
  }

  return (
    <>
      <Form.Item
        key="8"
        label="Company name"
        name="company_name"
        rules={[
          {
            required: true,
            message: "Please input company name!",
          },
        ]}
      >
        <Input className="input-field"></Input>
      </Form.Item>

      <Form.Item
        key="1"
        label="Select year of consumption"
        name="consumption_periode"
        rules={[
          {
            required: true,
            message: "Please select consumption periode!",
          },
        ]}
      >
        <Select>{options}</Select>
      </Form.Item>

      <Form.Item
        key="2"
        label="Payment for electricity according to invoice, incl. VAT"
        name="el_invoice_amount"
        rules={[
          {
            required: true,
            message: "Please input amount!",
          },
        ]}
      >
        <InputNumber className="input-field" prefix="DKK" />
      </Form.Item>

      <Form.Item
        key="3"
        label="kWh consumption for the period"
        name="period_consumption_kwh"
        rules={[
          {
            required: true,
            message: "Please input amount!",
          },
        ]}
      >
        <InputNumber className="input-field" prefix="kWh" />
      </Form.Item>

      <Form.Item
        key="4"
        label="Hereof calculated consumption for comfort cooling, room heating and hot water. Only relevant before 1 January 2021"
        name="calculated_chw"
        rules={[
          {
            required: true,
            message: "Please input amount!",
          },
        ]}
      >
        <InputNumber className="input-field" prefix="kWh" />
      </Form.Item>

      <Form.Item
        key="5"
        label="Payment for water according to invoice, incl. VAT"
        name="water_invoice_amount"
        rules={[
          {
            required: true,
            message: "Please input amount!",
          },
        ]}
      >
        <InputNumber className="input-field" prefix="DKK" />
      </Form.Item>

      <Form.Item
        key="6"
        label="M3 consumption for the period"
        name="period_consumption_m3"
        rules={[
          {
            required: true,
            message: "Please input amount!",
          },
        ]}
      >
        <InputNumber className="input-field" prefix="M3" />
      </Form.Item>

      <Form.Item
        key="7"
        label="General VAT deduction rate for the period"
        name="vat_percentage"
        rules={[
          {
            required: true,
            message: "Please input amount! The number should be rounded integer",
            type: "integer"
          },
        ]}
      >
        <InputNumber min={0} max={100} className="input-field" prefix="%" />
      </Form.Item>
    </>
  );
};
export default FormItems;
