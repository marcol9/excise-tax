import validator from "validator";

//checks if number is numeric
function valNumber(input) {
  return validator.isNumeric(input + "");
}
//checks if periode has correct format
function valPeriode(input) {
  return validator.isAlphanumeric(input + "", "da-DK", { ignore: " ().-" });
}
//validates inputs object
function validateInputs(inputsObj) {
  const ResultsOfChecks = [];
  ResultsOfChecks.push(valPeriode(inputsObj.consumption_periode));
  ResultsOfChecks.push(valNumber(inputsObj.el_invoice_amount));
  ResultsOfChecks.push(valNumber(inputsObj.period_consumption_kwh));
  ResultsOfChecks.push(valNumber(inputsObj.calculated_chw));
  ResultsOfChecks.push(valNumber(inputsObj.water_invoice_amount));
  ResultsOfChecks.push(valNumber(inputsObj.period_consumption_m3));
  ResultsOfChecks.push(valNumber(inputsObj.vat_percentage));

  const validationResult = !ResultsOfChecks.includes(false);
  return validationResult;
}

//validates calculations object
function validateCalculations(calculationsObj) {
  const arrayOfValues = Object.values(calculationsObj);
  const ResultsOfChecks = [];
  arrayOfValues.forEach((value) => {
    ResultsOfChecks.push(valNumber(value));
  });
  
  const validationResult = !ResultsOfChecks.includes(false);
  return validationResult;
}
//validates account number object
function validateAccNumbers(accNumbersObj) {
  const arrayOfValues = Object.values(accNumbersObj);
  const ResultsOfChecks = [];
  arrayOfValues.forEach((value) => {
    ResultsOfChecks.push(valNumber(value));
  });

  const validationResult = !ResultsOfChecks.includes(false);
  return validationResult;
}

export { validateInputs, validateAccNumbers, validateCalculations,valNumber };
