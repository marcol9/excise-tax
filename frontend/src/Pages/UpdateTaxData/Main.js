import React, { useEffect, useState } from "react";
import { Form, Button, message, Spin } from "antd";
import FormItems from "./FormItems.js";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl, handleError, notificationSuccess } from "../../util/util.js";

const UpdateTaxData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  //setting form values from state,
  useEffect(() => {
    if (location.state !== null) {
      form.setFieldsValue(location.state.taxDataObj);
    }
  }, []);

  const tax_data_id = location.state.taxDataObj.tax_data_id;

  async function updateTaxData(taxDataObj) {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/updateTaxData/${tax_data_id}`,
        taxDataObj,{ withCredentials: true }
      );
      notificationSuccess(response);
      navigateToManageTaxData();
    } catch (e) {
      handleError(e);
      setLoading(false);
    }
  }

  const navigateToManageTaxData = () => {
    navigate("/ManageTaxData");
  };

  const onFinish = (taxDataObj) => {
    updateTaxData(taxDataObj);
  };

  return (
    <>
      <h1 className="heading">Updating tax data</h1>
      <Spin spinning={loading}>
        <div className="center">
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
      </Spin>
    </>
  );
};
export default UpdateTaxData;
