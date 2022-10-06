import React from "react";
import './Home.css'

const Home = () => {
  return (
    <>
      <h1 className="heading">Home page</h1>

      <p className="paragraph">
        This application is intended to help calculate the reimbursement of
        excise tax on electricity and water for a VAT registered company that
        meets certain prerequisites. Companies registered for VAT can generally
        obtain a reimbursement of excise taxes duties levied on electricity and
        water; however, the application cannot necessarily be used by any given
        company. The prerequisites for using the application are described in more
        detail below.
      </p>
    </>
  );
};

export default Home;
