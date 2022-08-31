import taxData from "../models/taxData.js";

class taxDataRepo{
    constructor(db){
        this.db = db;
    }
    async getConsumptionPeriodes(){
        const text='SELECT consumption_periode FROM tax_data';
        try{
            const response = await this.db.query(text);
            const consumptionPeriodes = response.rows;
            return consumptionPeriodes;
        }catch(e){
            console.log(e)
            return 'database error'
        }
    }

    async getTaxData(consumptionPeriode){
        const text = 'SELECT energy_tax, reduction, compensation_chw, water_charges FROM tax_data WHERE consumption_periode = $1'
        const value = [consumptionPeriode];
        try{
            const response = await this.db.query(text,value);
            const taxDataObj = response.rows[0];
            if(response.rows.length === 0){
                return `no record found with consumption periode ${consumptionPeriode} `
            }
            return taxDataObj;
        }catch(e){
            console.log(e);
            return 'database error'
        }
    }

    
}
export default taxDataRepo;