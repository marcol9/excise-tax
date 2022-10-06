import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import classes from "./Calculations.module.css";
import CalculationsTable from "./CalculationsTable";

const Calculations = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { calculationsObj, inputsObj } = location.state;

  const goToAccountNoInput = () => {
    navigate(`/AccountNoInput`, { state: { calculationsObj, inputsObj } });
  };

  const goBack = () => {
    navigate("/newReport", { state: { inputsObj } });
  };

  return (
    <>
      <h2 className={classes.heading}>Company {inputsObj.company_name}</h2>
      <CalculationsTable calculationsObj={calculationsObj}/>

      <div className="submit-btn-div">
        <Button
          type="primary"
          className="next-step-btn"
          onClick={goToAccountNoInput}
        >
          Next step
        </Button>

        <Button type="secondary" className="go-back-btn" onClick={goBack}>
          Go back
        </Button>
      </div>
    </>
  );
};

export default Calculations;
