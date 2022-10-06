import React from "react";
import { Space, Table, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl, handleError, notificationSuccess } from "../../util/util";

const TaxDataTable = ({ taxData, setUpdate }) => {
  const navigate = useNavigate();

  const deleteTaxData = async (tax_data_id) => {
    try {
      const response = await axios.post(`${apiUrl}/deleteTaxData/${tax_data_id}`,{}, { withCredentials: true });
      notificationSuccess(response)
      setUpdate(true)
    } catch (e) {
      handleError(e);
    }
  }

  const navigateToUpdateData = (taxDataObj) => {
    navigate(`/updateTaxData/${taxDataObj.tax_data_id}`, {state: {taxDataObj}});
  };

  const columns = [
    {
      title: "Consumption periode",
      dataIndex: "consumption_periode",
      key: "consumption_periode",
    },
    {
      title: "Energiafgift, DKK",
      dataIndex: "energy_tax",
      key: "energy_tax",
    },
    {
      title: "Reduktion, DKK",
      dataIndex: "reduction",
      key: "reduction",
    },
    {
      title: "Godtgørelse for – Komfortkøling, opvarmning af rum og varmt vand, DKK",
      dataIndex: "compensation_chw",
      key: "compensation_chw",
    },
    {
      title: "Vandafgifter, DKK",
      dataIndex: "water_charges",
      key: "water_charges",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, taxDataObj) => (
        <Space size="middle">
          <Button
            type="secondary"
            onClick={() => navigateToUpdateData(taxDataObj)}
          >
            Update
          </Button>
          <Button
            type="primary"
            onClick={() => deleteTaxData(taxDataObj.tax_data_id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  function getTableData(taxData) {
    const data = [];
    taxData.forEach((record) => {
      data.push({
        key: record.tax_data_id,
        tax_data_id: record.tax_data_id,
        consumption_periode: record.consumption_periode,
        energy_tax: record.energy_tax,
        reduction: record.reduction,
        compensation_chw: record.compensation_chw,
        water_charges: record.water_charges,
      });
    });
    return data;
  }

  return (
    <>
      <Table bordered columns={columns} dataSource={getTableData(taxData)} />{" "}
    </>
  );
};

export default TaxDataTable;
