import react, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl, handleError } from "../../util/util";

const LogOut = () =>{
 const navigate = useNavigate();
    const logOut = async () =>{
        try{
        await axios.post(`${apiUrl}/logout`,{},{withCredentials:true})
        }catch(e){
            handleError(e)
        }
        navigate('/')
    }

    useEffect(()=>{
        logOut();
    },[])

}
export default LogOut