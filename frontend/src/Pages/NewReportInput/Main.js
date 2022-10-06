import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Spin, Checkbox, Alert } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./NewReportInput.module.css";
import InfoList from "./InfoList.js";
import FormItems from "./FormItems.js";
import { handleError, apiUrl, notificationError } from "../../util/util";


const NewReportInput = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(true); //displaying modal
  const [loading, setLoading] = useState(false); // displaying 'loading' sign
  const [consumptionPeriodes, setConsumptionPeriodes] = useState();
  const [checked, setChecked] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  //setting form values from state, in case user went back from the next step
  if (location.state !== null) {
    form.setFieldsValue(location.state.inputsObj);
  }

  //to do: handle not ok case
  //sending request with input data to get calculations
  async function getCalculations(inputData) {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/calculate`, inputData,{ withCredentials: true });
      const output = response.data.response;
      return output;
    } catch (e) {
      handleError(e);
    }
    setLoading(false);
  }

  //sending request to get consumption periodes form DB
  async function getConsumptionPeriodes() {
    setLoading(true);
    const response = await axios.post(`${apiUrl}/getConsumptionPeriodes`,{}, { withCredentials: true });
    const output = response.data.response;
    setConsumptionPeriodes(output);
    setLoading(false);
  }

  // getting consumption periodes on mount
  useEffect(() => {
    getConsumptionPeriodes();
  }, []);

  //checkbox logic
  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  function checkData(inputsObj){
    if(inputsObj.period_consumption_kwh > inputsObj.el_invoice_amount ){
      notificationError("Periode consumption in kWh should be less than electricity invoice amount")
      return false
    } else if(inputsObj.period_consumption_m3 > inputsObj.water_invoice_amount ){
      notificationError("Periode consumption in M3 should be less than water invoice amount")
      return false
    }else{
    return true;
    }
  }

  //When form is completed, getting calculations and sending user to the next page with calculations and inputs
  async function onFinish(inputsObj) {
    if(checkData(inputsObj)){
    const calculationsObj = await getCalculations(inputsObj);
    navigate("/Calculations", {
      state: { calculationsObj, inputsObj },
    });
  }
  }

  // case where user approves modal
  const handleOk = () => {
    if (checked) {
      setIsModalVisible(false);
    } else {
      setIsAlertVisible(true);
    }
  };

  // case where user cancels modal
  const handleCancel = () => {
    setIsModalVisible(false);
    navigate("/");
  };

  return (
    <div className={classes.center}>
      <Spin size="large" spinning={loading}>
        <Modal
          title="Prerequisites"
          visible={isModalVisible}
          width={800}
          closable={false}
          onCancel={handleCancel}
          onOk={handleOk}
          okText='I agree'
        >
          <InfoList/>
          <Checkbox checked={checked} onChange={onChange}>
            I have read everything above and agree with it
          </Checkbox>

          {isAlertVisible === true && (
            <Alert
              message="You need to agree with terms in order to proceed"
              type="warning"
            />
          )}
        </Modal>

        <Form
          form={form}
          name="basic"
          labelWrap={true}
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 6,
          }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{vat_percentage:"0"}}
        >
          <FormItems consumptionPeriodes={consumptionPeriodes}></FormItems>

          <div className="submit-btn-div">
            <Form.Item key="submit">
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
