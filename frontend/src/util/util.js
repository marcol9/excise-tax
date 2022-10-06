import {notification} from 'antd'

function handleError(e){
    console.log(e)
    const message = e.response.data.response
    const status = e.response.statusText
    notification['error']({
        message: "Error",
        duration: 7,
        description:
          `${status}: ${message}`,
      });
}
function notificationSuccess(response){
    const message = response.data.response
    notification['success']({
        message: "Success",
        duration: 7,
        description:
          `${message}`,
      });
}

function notificationSuccessMessage(message){
    notification['success']({
        message: "Success",
        duration: 7,
        description:
          `${message}`,
      });
}

function notificationError(message){
    notification['error']({
        message: "Error",
        duration: 7,
        description:
          `${message}`,
      });
}

function roundToTwo(num) {
    return Number.parseFloat(num).toFixed(2);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

const apiUrl = process.env.REACT_APP_API_URL


export {handleError,notificationSuccess,roundToTwo,notificationError,notificationSuccessMessage,getCookie, apiUrl}