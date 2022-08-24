class inputsRepo{
    constructor(db){
        this.db = db;
    }
    async createInput(inputObject){
        console.log(inputObject)
        const text = 'INSERT INTO inputs(consomption_periode,el_invoice_amount,period_consumption_kwh,calculated_chw,water_invoice_amount,period_consumption_m3,vat_percentage) VALUES($1,$2,$3,$4,$5,$6,$7)';
        const values = [inputObject.consomption_periode,inputObject.el_invoice_amount,inputObject.period_consumption_kwh,inputObject.calculated_chw,inputObject.water_invoice_amount,inputObject.period_consumption_m3,inputObject.vat_percentage]
        try{
        const response = await this.db.query(text,values);
        const data = response.rows
        return data
        }catch(e){
        console.log(e)
        return "database input error"
        }
    }
}
export default inputsRepo