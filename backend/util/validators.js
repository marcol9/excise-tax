import validator from "validator";
import Api400Error from "../errorHandling/api400Error.js";

//checks if number is numeric (supports decimal)
function valNumber(number) {
  return validator.isNumeric(number + ""); //adding + "" because function accepts strings
}

// checks if number is integer
function valInt(number){
    return validator.isInt(number+"");
}

//checks if periode has correct format
function valPeriode(consumption_periode) {
    if(consumption_periode === undefined){return false}

  return validator.isAlphanumeric(consumption_periode + "", "da-DK", { ignore: " ().-" });
}
//there can be a lot of different symbols in company names, so just checking if it is null
function valCompanyName(company_name){
    if(company_name == null){
        return false;
    }else{
        return true;
    }
}
//validates inputs object
function validateInputs(inputsObj) {
  const schema = {
    company_name: (value) => valCompanyName(value),
    consumption_periode: (value) => valPeriode(value),
    el_invoice_amount: (value) => valNumber(value),
    period_consumption_kwh: (value) => valNumber(value),
    calculated_chw: (value) => valNumber(value),
    water_invoice_amount: (value) => valNumber(value),
    period_consumption_m3: (value) => valNumber(value),
    vat_percentage: (value) => valNumber(value),
  };

  const validate = (object, schema) =>
    Object.keys(schema)
      .filter((key) => !schema[key](object[key]))
      .map((key) => {
        throw new Api400Error(`${key} field is invalid.`);
      });

  validate(inputsObj, schema);
}

//validates calculations object
function validateCalculations(calculationsObj) {
  const schema = {
    taxes_total_el: (value) => valNumber(value),
    not_reimb_tax: (value) => valNumber(value),
    vat_el: (value) => valNumber(value),
    el_and_vat: (value) => valNumber(value),
    taxes_total_el: (value) => valNumber(value),
    taxes_water_total: (value) => valNumber(value),
    vat_water: (value) => valNumber(value),
    water_and_vat: (value) => valNumber(value),
    reimb_el_tax: (value) => valNumber(value),
    reimb_water_tax: (value) => valNumber(value),
    deduct_el_tax: (value) => valNumber(value),
    deduct_water_tax: (value) => valNumber(value),
    reimb_tax_and_vat: (value) => valNumber(value),
  };

  const validate = (object, schema) =>
    Object.keys(schema)
      .filter((key) => !schema[key](object[key]))
      .map((key) => {
        throw new Api400Error(`${key} field is invalid.`);
      });

  validate(calculationsObj, schema);
}

//validates account number object
function validateAccNumbers(accNumbersObj) {
  const schema = {
    debited_el_cons: (value) => valNumber(value),
    credited_el_cons_supplier: (value) => valNumber(value),
    debited_el_tax: (value) => valNumber(value),
    credited_el_cons: (value) => valNumber(value),
    debited_water_cons: (value) => valNumber(value),
    credited_water_cons_supplier: (value) => valNumber(value),
    debited_water_tax: (value) => valNumber(value),
    credited_water_cons: (value) => valNumber(value),
    debited_automatically: (value) => valNumber(value),
    vat_credited_el: (value) => valNumber(value),
    vat_credited_water: (value) => valNumber(value),
  };

  const validate = (object, schema) =>
    Object.keys(schema)
      .filter((key) => !schema[key](object[key]))
      .map((key) => {
        throw new Api400Error(`${key} field is invalid.`);
      });

  validate(accNumbersObj, schema);
}

//validates tax data object
function validateTaxData(taxDataObj){
    const schema = {
        consumption_periode: (value) => valPeriode(value),
        energy_tax: (value) => valNumber(value),
        reduction: (value) => valNumber(value),
        compensation_chw: (value) => valNumber(value),
        water_charges: (value) => valNumber(value)

    }
    const validate = (object, schema) =>
    Object.keys(schema)
      .filter((key) => !schema[key](object[key]))
      .map((key) => {
        throw new Api400Error(`${key} field is invalid.`);
      });

  validate(taxDataObj, schema);
}

export { validateInputs, validateAccNumbers, validateCalculations, valNumber, validateTaxData, valPeriode, valInt };
