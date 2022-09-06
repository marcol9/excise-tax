import taxData from "../models/taxData.js";
import Api404Error from "../errorHandling/api404Error.js";
import { logError } from "../errorHandling/errorHandler.js";
import Api500Error from "../errorHandling/api500Error.js";

class taxDataRepo{
    constructor(db){
        this.db = db;
    }
    async getConsumptionPeriodes(){
        const text='SELECT consumption_periode FROM tax_data';
            const response = await this.db.query(text).catch((error) => {
                logError(error)
                throw new Api500Error('Database error');
            });
            const consumptionPeriodes = response.rows;
            if(response.rows.length === 0){
                throw new Api404Error(`Tax data not found`)
            }
            return consumptionPeriodes;

        
    }

    async getTaxData(consumptionPeriode){
        const text = 'SELECT energy_tax, reduction, compensation_chw, water_charges FROM tax_data WHERE consumption_periode = $1'
        const value = [consumptionPeriode];
            const response = await this.db.query(text,value).catch((error) => {
                logError(error)
                throw new Api500Error('Database error');
            });
            const taxDataObj = response.rows[0];
            if(response.rows.length === 0){
                throw new Api404Error(`Tax data for consumption periode ${consumptionPeriode} not found`)
            }
            return taxDataObj;
        
    }

    
}
export default taxDataRepo;