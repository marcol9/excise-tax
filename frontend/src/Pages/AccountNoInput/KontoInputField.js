import React from "react";
import { Form, InputNumber } from "antd";

//component of account number's input field
const KontoInputField = ({ formItemName }) => {
  return (
    <>
      <Form.Item
        name={formItemName}
        rules={[
          {
            required: true,
            message: "Please input account number!",
          },
        ]}
      >
        <InputNumber min={1} className="inputNumber"/>
      </Form.Item>
    </>
  );
};

export default KontoInputField;
