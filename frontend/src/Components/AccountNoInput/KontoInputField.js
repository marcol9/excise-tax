import React from "react";
import { Form, InputNumber } from "antd";

const KontoInputField = ({formItemName}) =>  {

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
              <InputNumber className="inputNumber"></InputNumber>
            </Form.Item>
    </>
  
    );
}

export default KontoInputField;