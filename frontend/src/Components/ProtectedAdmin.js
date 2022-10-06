import { Navigate } from "react-router-dom";
const ProtectedAdmin = ({ role, children }) => {
 if (role === "unauth") {
 return <Navigate to="/login"  />;
 }else if(role === "user"){
    return <h1>Unauthorized</h1>
 }else if(role === "admin"){
    return children;
 }
 
};
export default ProtectedAdmin;