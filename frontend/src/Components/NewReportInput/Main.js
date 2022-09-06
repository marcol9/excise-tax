import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Spin, Checkbox, Alert } from "antd";
import "./NewReportInput.css";
import { useNavigate } from "react-router-dom";
import InfoList from "./InfoList.js";
import FormItems from "./FormItems.js";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const NewReportInput = () => {
  let navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(true); //displaying modal
  const [loading, setLoading] = useState(false);  // displaying 'loading' sign
  const [consumptionPeriodes, setConsumptionPeriodes] = useState();
  const [checked, setChecked] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

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
  }

  useEffect(() => {
    getConsumptionPeriodes();
  }, []);

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

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
    if(checked){
    setIsModalVisible(false);
    }else{
      setIsAlertVisible(true)
    }
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
          <Checkbox checked={checked} onChange={onChange} >I have read everything above and agree with it</Checkbox>
          {isAlertVisible === true &&
            <Alert message="You need to agree with terms in order to proceed" type="warning" />
          }


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
