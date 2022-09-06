import Api400Error from "../errorHandling/api400Error.js";
import calculations from "../Models/calculations.js";
import {roundToTwo, handleVatPercentage} from '../util/util.js'
import { validateCalculations, validateInputs } from "../util/validators.js";

class calculationsService {
    constructor(calculationsRepo,taxDataService){
        this.calculationsRepo = calculationsRepo;
        this.taxDataService = taxDataService;
    }

    // calculates calculations from input object
    async calculate(inputsObj){
        if(!validateInputs(inputsObj)){
            throw new Api400Error('Invalid input data')
        }
        
        //declaring variables
        const consumption_periode = inputsObj.consumption_periode;
        const el_invoice_amount = inputsObj.el_invoice_amount;
        const period_consumption_kwh = inputsObj.period_consumption_kwh;
        const calculated_chw = inputsObj.calculated_chw;
        const water_invoice_amount = inputsObj.water_invoice_amount;
        const period_consumption_m3 = inputsObj.period_consumption_m3;
        const vat_percentage = handleVatPercentage(Math.round(inputsObj.vat_percentage));

        // getting tax data for specific consumption periode
        const taxData = await this.taxDataService.getTaxData(consumption_periode);
        
        //declaring variables
        const energy_tax = taxData.energy_tax;
        const reduction = taxData.reduction;
        const compensation_chw = taxData.compensation_chw;
        const water_charges = taxData.water_charges;

        const calculationsObj = new calculations();
        
        //updating calculations object with fields and values
        calculationsObj.taxes_total_el = roundToTwo(energy_tax/100*period_consumption_kwh);
        calculationsObj.not_reimb_tax = roundToTwo(reduction/100*period_consumption_kwh);
        calculationsObj.vat_el = roundToTwo(el_invoice_amount*0.2);
        calculationsObj.el_and_vat = roundToTwo(calculationsObj.taxes_total_el + calculationsObj.vat_el);
        calculationsObj.taxes_water_total = roundToTwo(water_charges*period_consumption_m3);
        calculationsObj.vat_water = roundToTwo(water_invoice_amount*0.2);
        calculationsObj.water_and_vat = roundToTwo(calculationsObj.taxes_water_total + calculationsObj.vat_water);
        calculationsObj.taxes_and_vat_total = roundToTwo(calculationsObj.el_and_vat + calculationsObj.water_and_vat);
        calculationsObj.reimb_el_tax = roundToTwo((((energy_tax - reduction)*(period_consumption_kwh - calculated_chw)/100+calculated_chw*compensation_chw/100))*vat_percentage);
        calculationsObj.reimb_water_tax = roundToTwo(water_charges*period_consumption_m3*vat_percentage);
        calculationsObj.deduct_el_tax = roundToTwo(calculationsObj.vat_el*vat_percentage);
        calculationsObj.deduct_water_tax = roundToTwo(calculationsObj.vat_water*vat_percentage);
        calculationsObj.reimb_tax_and_vat= roundToTwo(calculationsObj.reimb_el_tax +calculationsObj.reimb_water_tax + calculationsObj.deduct_el_tax +calculationsObj.deduct_water_tax);

        return calculationsObj;
    }

    // saves calculations object to DB
    async createCalculations(calculationsObj){
        if(!validateCalculations(calculationsObj)){
            throw new Api400Error('Invalid calculation data')
        }
        return await this.calculationsRepo.createCalculations(calculationsObj);
    }
}
export default calculationsService;