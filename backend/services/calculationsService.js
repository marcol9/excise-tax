import calculations from "../Models/calculations.js";
import {roundToTwo, handleVatPercentage} from '../util/util.js'

class calculationsService {
    constructor(calculationsRepo,taxDataService){
        this.calculationsRepo = calculationsRepo;
        this.taxDataService = taxDataService;
    }


    async calculate(input){
        
        const consumption_periode = input.consumption_periode;
        const el_invoice_amount = input.el_invoice_amount;
        const period_consumption_kwh = input.period_consumption_kwh;
        const calculated_chw = input.calculated_chw;
        const water_invoice_amount = input.water_invoice_amount;
        const period_consumption_m3 = input.period_consumption_m3;
        const vat_percentage = handleVatPercentage(input.vat_percentage);

        const taxData = await this.taxDataService.getTaxData(consumption_periode);

        const energy_tax = taxData.energy_tax;
        const reduction = taxData.reduction;
        const compensation_chw = taxData.compensation_chw;
        const water_charges = taxData.water_charges;

        const calculationsObj = new calculations();
        
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

    async createCalculations(calculationsObj){
        return await this.calculationsRepo.createCalculations(calculationsObj);
    }
}
export default calculationsService;