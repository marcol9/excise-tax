import React from "react";
import { Form, Input, InputNumber, Select } from "antd";

const FormItems = () => {
  return (
    <>
      <Form.Item
        key="1"
        label="Consumption periode"
        name="consumption_periode"
        rules={[
          {
            required: true,
            message: "Please select consumption periode!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        key="2"
        label="Energiafgift"
        name="energy_tax"
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
        label="Reduktion"
        name="reduction"
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
        key="4"
        label="Godtgørelse for – Komfortkøling, opvarmning af rum og varmt vand	"
        name="compensation_chw"
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
        key="5"
        label="Vandafgifter	"
        name="water_charges"
        rules={[
          {
            required: true,
            message: "Please input amount!",
          },
        ]}
      >
        <InputNumber className="input-field" prefix="DKK" />
      </Form.Item>
    </>
  );
};
export default FormItems