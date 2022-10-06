import { Navigate } from "react-router-dom";
const Protected = ({ role, children }) => {
 if (role === "unauth") {
 return <Navigate to="/login"  />;
 }else{
    return children;
 }
 
};
export default Protected;