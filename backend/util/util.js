import Api400Error from "../errorHandling/api400Error.js";

//round number to two decimals
function roundToTwo(num) {
    return Number.parseFloat(num).toFixed(2);
}

//creates decimal value from vat input
function handleVatPercentage(vat_percentage){
return vat_percentage/100;
}

// if inputObj is null, throws an error
function checkIfObjectIsNull(inputObj){
    if(inputObj == null){
        throw new Api400Error('Missing one or more body objects')
    }
    return inputObj
}

 // formatting date to dd/mm/yyyy
function formatDate(inputDate) {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${date}/${month}/${year}`;
  }

export  {roundToTwo, handleVatPercentage,checkIfObjectIsNull, formatDate}