class inputs{
    constructor(input_id,consomption_periode,el_invoice_amount,period_consumption_kwh,calculated_chw,water_invoice_amount,period_consumption_m3,vat_percentage){
        this.input_id = input_id;
        this.consomption_periode = consomption_periode
        this.el_invoice_amount = el_invoice_amount
        this.period_consumption_kwh = period_consumption_kwh
        this.calculated_chw = calculated_chw
        this.water_invoice_amount = water_invoice_amount
        this.period_consumption_m3 = period_consumption_m3
        this.vat_percentage = vat_percentage
    }
    
    constructor(consomption_periode,el_invoice_amount,period_consumption_kwh,calculated_chw,water_invoice_amount,period_consumption_m3,vat_percentage){
        this.consomption_periode = consomption_periode
        this.el_invoice_amount = el_invoice_amount
        this.period_consumption_kwh = period_consumption_kwh
        this.calculated_chw = calculated_chw
        this.water_invoice_amount = water_invoice_amount
        this.period_consumption_m3 = period_consumption_m3
        this.vat_percentage = vat_percentage
    }

}
export default inputs;