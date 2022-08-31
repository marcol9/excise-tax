import React from "react";
import { Form, InputNumber, Select } from "antd";

const { Option } = Select;

const FormItems = ({ consumptionPeriodes }) => {
  if (consumptionPeriodes == null) return null;
  let options = [];
  consumptionPeriodes.forEach((consumptionPeriode) => {
    const value = consumptionPeriode.consumption_periode;
    options.push(<Option value={value}>{value}</Option>);
  });

  return (
    <>
      <Form.Item
        key="1"
        label="Vælg årstal for forbrug"
        name="consumption_periode"
        rules={[
          {
            required: true,
            message: "Please input your Year!",
          },
        ]}
      >
        <Select>{options}</Select>
      </Form.Item>

      <Form.Item
        key="2"
        label="El fakturabeløb inkl. moms"
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
        label="Periodens forbrug i kWh"
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
        label="Heraf opgjort til komfortkøling, opvarming af rum og varmt vand, dog alene relevant før 1. januar 2021"
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
        label="Vand fakturabeløb inkl.moms"
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
        label="Periodens forbrug i M3"
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
        label="Periodens generelle momsfradragsprocent"
        name="vat_percentage"
        rules={[
          {
            required: true,
            message: "Please input amount!",
          },
        ]}
      >
        <InputNumber className="input-field" prefix="%" />
      </Form.Item>
    </>
  );
};
export default FormItems;
