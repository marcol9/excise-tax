import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./Calculations.css";
import CalculationsTable from "./CalculationsTable";


const Calculations = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const calculationsObj = location.state.calculationsObj;
  const inputsObj = location.state.inputsObj;

  function goToAccountNoInput(){
    navigate(`/AccountNoInput`, { state: { calculationsObj, inputsObj } });
  };

  return (
    <div>
      <div>
        <CalculationsTable
          calculationsObj={calculationsObj}
        ></CalculationsTable>
      </div>
      <div className="submit-btn-div">
        <Button
          type="primary"
          className="next-step-btn"
          onClick={() => goToAccountNoInput()}
        >
          {" "}
          Next step
        </Button>
      </div>
    </div>
  );
};

export default Calculations;
