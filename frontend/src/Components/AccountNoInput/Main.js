import { React } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Table, Button, Form } from "antd";
import "./AccountNoInput.css";
import getTableData from "./GetTableData";

const AccountNoInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const calculationsObj = location.state.calculationsObj;
  const inputsObj = location.state.inputsObj;
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

  const onFinish = (accNumbersObj) => {
    navigate("/Results", {
      state: { calculationsObj, inputsObj, accNumbersObj },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Table
            className="calculations-table"
            pagination={false}
            columns={columns}
            dataSource={data}
            size="small"
          ></Table>
          <div className="submit-btn-div">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AccountNoInput;
