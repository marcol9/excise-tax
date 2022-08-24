import { React } from "react";
import { useParams } from "react-router-dom";
import { Space, Table, Tag, Button, Form, InputNumber } from "antd";
import "./AccountNoInput.css";


const AccountNoInput = () => {
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
//data hardcoded now, needs to be chaneged later (belob)
  const data = [
    {
      key: "1",
      bogfores: <u>Elforbrug</u>,
    },
    {
      key: "2",
      bogfores: "Debiteres på konto for elforbrug (aut. momstræk)",
      konto: (
        <Form.Item
          name="debited_el_cons"
          rules={[
            {
              required: true,
              message: "Please input account number!",
            },
          ]}
        >
          <InputNumber className="inputNumber"></InputNumber>
        </Form.Item>
      ),
      belob: 100,
    },

    {
      key: "3",
      bogfores: "Krediteres på kreditorkonto for elleverandøren",
      konto: (
        <Form.Item
          name="credited_el_cons_supplier"
          rules={[
            {
              required: true,
              message: "Please input account number!",
            },
          ]}
        >
          <InputNumber className="inputNumber"></InputNumber>
        </Form.Item>
      ),
      belob: 100,
    },

    {
      key: "4",
      bogfores: "Debiteres på konto for elafgift",
      konto: (
        <Form.Item
          name="debited_el_tax"
          rules={[
            {
              required: true,
              message: "Please input account number!",
            },
          ]}
        >
          <InputNumber className="inputNumber"></InputNumber>
        </Form.Item>
      ),
      belob: 100,
    },

    {
      key: "5",
      bogfores: "Krediteres på konto for elforbrug - NB: Slet aut. moms..!",
      konto: (
        <Form.Item
          name="credited_el_cons"
          rules={[
            {
              required: true,
              message: "Please input account number!",
            },
          ]}
        >
          <InputNumber className="inputNumber"></InputNumber>
        </Form.Item>
      ),
      belob: 100,
    },

    {
      key: "6",
    },

    {
      key: "7",
      bogfores: <u>Vandforbrug</u>,
    },

    {
      key: "8",
      bogfores: "Debiteres på konto for vandforbrug (aut. momstræk)",
      konto: (
        <Form.Item
          name="debited_water_cons"
          rules={[
            {
              required: true,
              message: "Please input account number!",
            },
          ]}
        >
          <InputNumber className="inputNumber"></InputNumber>
        </Form.Item>
      ),
      belob: 100,
    },

    {
      key: "9",
      bogfores: "Krediteres på kreditorkonto for vandleverandøren",
      konto: (
        <Form.Item
          name="credited_water_cons_supplier"
          rules={[
            {
              required: true,
              message: "Please input account number!",
            },
          ]}
        >
          <InputNumber className="inputNumber"></InputNumber>
        </Form.Item>
      ),
      belob: 100,
    },

    {
      key: "10",
      bogfores: "Debiteres på konto for vandafgift",
      konto: (
        <Form.Item
          name="debited_water_tax"
          rules={[
            {
              required: true,
              message: "Please input account number!",
            },
          ]}
        >
          <InputNumber className="inputNumber"></InputNumber>
        </Form.Item>
      ),
      belob: 100,
    },

    {
      key: "11",
      bogfores: "Krediteres på konto for vandforbrug - NB: Slet aut. moms..!",
      konto: (
        <Form.Item
          name="credited_water_cons"
          rules={[
            {
              required: true,
              message: "Please input account number!",
            },
          ]}
        >
          <InputNumber className="inputNumber"></InputNumber>
        </Form.Item>
      ),
      belob: 100,
    },

    {
      key: "12",
    },

    {
      key: "13",
      bogfores: <b>Forudsættes bogført automatisk</b>,
    },

    {
      key: "14",
      bogfores: "Debiteres automatisk på konto vedr. købsmoms",
      konto: (
        <Form.Item
          name="debited_automatically"
          rules={[
            {
              required: true,
              message: "Please input account number!",
            },
          ]}
        >
          <InputNumber className="inputNumber"></InputNumber>
        </Form.Item>
      ),
      belob: 100,
    },

    {
      key: "15",
      bogfores: "Momsen krediteres på konto for elforbrug",
      konto: (
        <Form.Item
          name="vat_credited_el"
          rules={[
            {
              required: true,
              message: "Please input account number!",
            },
          ]}
        >
          <InputNumber className="inputNumber"></InputNumber>
        </Form.Item>
      ),
      belob: 100,
    },

    {
      key: "16",
      bogfores: "Momsen krediteres på konto for vandforbrug",
      konto: (
        <Form.Item
          name="vat_credited_water"
          rules={[
            {
              required: true,
              message: "Please input account number!",
            },
          ]}
        >
          <InputNumber className="inputNumber"></InputNumber>
        </Form.Item>
      ),
      belob: 100,
    },
  ];

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let { reportId } = useParams();
  console.log(reportId);

 

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
