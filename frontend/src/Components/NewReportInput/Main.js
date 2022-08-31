import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Spin } from "antd";
import "./NewReportInput.css";
import { useNavigate } from "react-router-dom";
import InfoList from "./InfoList.js";
import FormItems from "./FormItems.js";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const NewReportInput = () => {
  let navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [consumptionPeriodes, setConsumptionPeriodes] = useState();

  //to do: handle not ok case
  async function getCalculations(inputData) {
    setLoading(true);
    const response = await axios.post(apiUrl + "/calculate", inputData);
    const output = response.data.response;
    setLoading(false);

    return output;
  }

  async function getConsumptionPeriodes() {
    setLoading(true);
    const response = await axios.post(apiUrl + "/getConsumptionPeriodes");
    const output = response.data.response;
    setConsumptionPeriodes(output);
    setLoading(false);

    return output;
  }

  useEffect(() => {
    getConsumptionPeriodes();
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  async function onFinish(inputsObj) {
    const calculationsObj = await getCalculations(inputsObj);
    navigate("/Calculations", {
      state: { calculationsObj, inputsObj },
    });
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    navigate("/");
  };

  return (
    <div className="center">
      <Spin size="large" spinning={loading}>
        <Modal
          title="Forudsætninger"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
        >
          <InfoList></InfoList>
        </Modal>

        <Form
          name="basic"
          labelWrap={true}
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 6,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <FormItems consumptionPeriodes={consumptionPeriodes}></FormItems>

          <div className="submit-btn-div">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default NewReportInput;
