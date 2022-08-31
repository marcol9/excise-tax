function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function handleVatPercentage(vat_percentage){
return vat_percentage/100;
}
export  {roundToTwo, handleVatPercentage}