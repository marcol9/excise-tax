import Api400Error from "../errorHandling/api400Error.js";

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function handleVatPercentage(vat_percentage){
return vat_percentage/100;
}

function checkIfObjectIsNull(inputObj){
    if(inputObj == null){
        throw new Api400Error('Missing one or more body objects')
    }
    return inputObj
}

export  {roundToTwo, handleVatPercentage,checkIfObjectIsNull}