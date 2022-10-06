import React from "react";
import './Footer.css'

const Footer = () =>{

return (
    <div className="footer-section">
    <div className='footer'>
        <h4 className="kontakt"><b>Contact</b></h4>
        <h4>If the actual use of the application gives rise to questions or your company does not meet the above prerequisites, you are welcome to contact one of the following employees at Deloitte:</h4>
        <h4>Kasper Bo Olesen, e-mail: <a href="mailto:kaolesen@deloitte.dk">kaolesen@deloitte.dk</a>, tlf.: +45 30 93 42 04 <br/>
          Mia Strand Christensen, e-mail: <a href="mailto:mschristian@deloitte.dk">mschristian@deloitte.dk</a>, tlf.: +45 28 30 18 70
        </h4>
        <h4 className="copyright">
        Deloitte ©2022 
        </h4>
    </div>
    </div>
);
}

export default Footer