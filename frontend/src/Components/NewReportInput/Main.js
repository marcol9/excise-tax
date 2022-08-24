import React, { useState } from "react";
import { Button, Form, DatePicker, InputNumber, Modal } from "antd";
import "./NewReportInput.css";
import { useNavigate } from "react-router-dom";

const NewReportInput = () => {
  let navigate = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [isModalVisible, setIsModalVisible] = useState(true);

  const onFinish = (inputData) => {
    inputData.consomption_periode =
      inputData.consomption_periode._d.getFullYear();
    navigate("/Calculations", {
      state: { inputData },
    });
    console.log(3);
  };

  const handleOk = () => {
    setIsModalVisible(false); // can remove probably
  };

  const handleCancel = () => {
    setIsModalVisible(false); // can remove probably
    navigate("/");
  };

  return (
    <div className="center">
      <Modal
        title="Forudsætninger"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <ul>
          <li>
            {" "}
            Kundens faktura indeholder ikke rykkergebyr eller andre beløb, som
            ikke er momspligtige,
          </li>
          <li> Kunden opfylder forbrugskriteriet,</li>
          <li>
            {" "}
            Vand og elektriciteten er forbrugt af den samme juridiske enhed, som
            indberetter godtgørelsen,
          </li>
          <li> Der er ikke anvendt el og/eller vand til private formål,</li>
          <li>
            {" "}
            Der er ikke sket videresalg af el og/eller vand, f.eks. salg til
            lejere, til en operatør af en ladestander eller anden tredjepart,
          </li>
          <li>
            {" "}
            Kundens godtgørelsesberettigede forbrug relaterer sig udelukkende
            til momspligtige aktiviteter,
          </li>
          <li>
            {" "}
            Der er ikke anvendt el til aktiviteter omfattet af bilag 1 til
            elafgiftsloven eller aktiviteter, der kan ligestilles hermed,
          </li>
          <li>
            {" "}
            Hvis elektricitet forbruges i ladestandere til opladning af elbiler
            mv., forudsættes det, at ladestanderen er kundens egen og ikke
            hverken drives af eller forsynes med elektricitet fra tredjepart,
          </li>
          <li>
            {" "}
            Elektriciteten stammer ikke fra et VE-anlæg, f.eks. solcelleanlæg,
            hvor der ikke er afregnet og betalt elafgift,
          </li>
          <li>
            {" "}
            Der er ikke indgået aftale om forbrugsregistrering, jf.
            elafgiftslovens § 4,
          </li>
          <li>
            {" "}
            Yderligere gør følgende forudsætninger sig gældende, hvis regnearket
            anvendes for perioden før 1. januar 2021:
          </li>
          <ul>
            <li> Der er ikke anvendt el til særlige produktionsprocesser,</li>
            <li>
              {" "}
              Periodens forbrug af elektricitet omfatter kun forbrug til proces
              og/eller målt forbrug til henholdsvis komfortkøling, opvarmning af
              rum eller af varmt vand,
            </li>
            <li>
              {" "}
              Der er ikke anvendt el til varmepumper, hvor der ikke er foretaget
              en skematisk fordeling af varmepumpens forbrug af el til
              henholdsvis varme og køl,
            </li>
          </ul>
          <li>
            {" "}
            Hvis regnearket anvendes til beregning af en kundes
            godtgørelsesberettigede elafgifter for perioder før den 1. januar
            2021, skal el til opvarmning af rum, vand eller komfortkøling være
            særskilt målt,
          </li>
          <li>
            {" "}
            Kunden kan ikke kategoriseres som kriseramt i henhold til
            EU-definition heraf, jf. punkt 2.2 i Europa-Kommissionens
            rammebestemmelser for statsstøtte til redning og omstrukturering af
            kriseramte ikke-finansielle virksomheder.
          </li>
        </ul>
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
        <Form.Item
          label="Vælg årstal for forbrug"
          name="consomption_periode"
          rules={[
            {
              required: true,
              message: "Please input your Year!",
            },
          ]}
        >
          <DatePicker className="input-field" picker="year" />
        </Form.Item>

        <Form.Item
          label="El fakturabeløb inkl. moms"
          name="el_invoice_amount"
          rules={[
            {
              required: true,
              message: "Please input amount!",
            },
          ]}
        >
          <InputNumber className="input-field" prefix="DKK" />
        </Form.Item>

        <Form.Item
          label="Periodens forbrug i kWh"
          name="period_consumption_kwh"
          rules={[
            {
              required: true,
              message: "Please input amount!",
            },
          ]}
        >
          <InputNumber className="input-field" prefix="kWh" />
        </Form.Item>

        <Form.Item
          label="Heraf opgjort til komfortkøling, opvarming af rum og varmt vand, dog alene relevant før 1. januar 2021"
          name="calculated_chw"
          rules={[
            {
              required: true,
              message: "Please input amount!",
            },
          ]}
        >
          <InputNumber className="input-field" prefix="kWh" />
        </Form.Item>

        <Form.Item
          label="Vand fakturabeløb inkl.moms"
          name="water_invoice_amount"
          rules={[
            {
              required: true,
              message: "Please input amount!",
            },
          ]}
        >
          <InputNumber className="input-field" prefix="DKK" />
        </Form.Item>

        <Form.Item
          label="Periodens forbrug i M3"
          name="period_consumption_m3"
          rules={[
            {
              required: true,
              message: "Please input amount!",
            },
          ]}
        >
          <InputNumber className="input-field" prefix="M3" />
        </Form.Item>

        <Form.Item
          label="Periodens generelle momsfradragsprocent"
          name="vat_percentage"
          rules={[
            {
              required: true,
              message: "Please input amount!",
            },
          ]}
        >
          <InputNumber className="input-field" prefix="%" />
        </Form.Item>

        <div className="submit-btn-div">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          {
            // save in database after everything is ok
            //
          }
        </div>
      </Form>
    </div>
  );
};

export default NewReportInput;
