import React from "react";
import { Form, Button, notification } from "antd";
import axios from "axios";
import FormItems from "./FormItems";
import "./AddTaxData.css";
import { apiUrl, handleError, notificationSuccess } from "../../util/util";
import { useNavigate } from "react-router-dom";

const AddTaxData = () => {
  const navigate = useNavigate();

  const createTaxData = async (taxData) => {
    try {
      const response = await axios.post(`${apiUrl}/addTaxData`, taxData,{ withCredentials: true });
      notificationSuccess(response)
      navigateToManageTaxData();
    } catch (e) {
      handleError(e);
    }
  };

  const onFinish = (taxData) => {
    createTaxData(taxData);
  };
  const navigateToManageTaxData = () => {
    navigate("/ManageTaxData");
  };

  return (
    <div className="center">
      <Form
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
      >
        <FormItems />
        <div className="submit-btn-div">
          <Form.Item key="submit">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddTaxData;
