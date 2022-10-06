import { React } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table, Button, Form } from "antd";
import "./AccountNoInput.css";
import getTableData from "./GetTableData";

const AccountNoInput = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {calculationsObj, inputsObj, accNumbersObj} = location.state;

  
  //setting form values from state, in case user went back from the next step
  const [form] = Form.useForm();
  if (accNumbersObj !== null) {
    form.setFieldsValue(accNumbersObj);
  }

  //getting table data
  const data = getTableData(calculationsObj, inputsObj);

  const columns = [
    {
      title: <b>Bogføres således</b>,
      dataIndex: "bogfores",
      key: "bogfores",
    },
    {
      title: <b>Konto</b>,
      dataIndex: "konto",
      key: "konto",
    },
    {
      title: <b>Beløb, DKK</b>,
      dataIndex: "belob",
      key: "belob",
    },
  ];

  //called when form is submitted
  const onFinish = (accNumbersObj) => {
    navigate("/Results", {
      state: { calculationsObj, inputsObj, accNumbersObj },
    });
  };

  const goBack = () => {
    navigate("/Calculations", { state: { calculationsObj, inputsObj } });
  }

  return (
      <>
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Table
            bordered
            className="calculations-table"
            pagination={false}
            columns={columns}
            dataSource={data}
            size="small"
          />
          <div className="submit-btn-div">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

              <Button
                type="secondary"
                className="go-back-btn"
                onClick={goBack}
              >
                Go back
              </Button>
            </Form.Item>
          </div>
        </Form>
      </>
  );
};

export default AccountNoInput;
