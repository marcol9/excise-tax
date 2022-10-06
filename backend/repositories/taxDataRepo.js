import Api404Error from "../errorHandling/api404Error.js";
import { logError } from "../errorHandling/errorHandler.js";
import Api500Error from "../errorHandling/api500Error.js";
import Api400Error from "../errorHandling/api400Error.js";

class taxDataRepo{
    constructor(db){
        this.db = db;
    }
    //returns all existing consumption periodes
    async getConsumptionPeriodes(){
        const text='SELECT consumption_periode FROM tax_data ORDER BY consumption_periode';
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

    //returns tax data for specific consumption periode
    async getTaxData(consumptionPeriode){
        const text = 'SELECT energy_tax, reduction, compensation_chw, water_charges FROM tax_data WHERE consumption_periode = $1 ORDER BY consumption_periode'
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

    // saves tax data to DB, returns ID of created record
    async createTaxData(taxDataObj){
        const text = 'INSERT INTO tax_data (consumption_periode,energy_tax, reduction, compensation_chw, water_charges) VALUES($1,$2,$3,$4,$5) RETURNING tax_data_id'
        const values = [taxDataObj.consumption_periode, taxDataObj.energy_tax, taxDataObj.reduction, taxDataObj.compensation_chw, taxDataObj.water_charges];

        const response = await this.db.query(text,values).catch((error) => {
            if(error.code == 23505){
                throw new Api400Error(`Record with consumption periode ${taxDataObj.consumption_periode} already exists.`)
            }
            logError(error)
            throw new Api500Error('Database error');
        });
        if(response.rows.length === 0){
            throw new Api400Error('Invalid calculation data. No record saved in database')
          }
        const tax_data_id = response.rows[0].tax_data_id
        return `Tax data record with id ${tax_data_id} has been created successfully`
    }

    async deleteTaxData(tax_data_id){
        const text = 'DELETE FROM tax_data WHERE tax_data_id = $1'
        const value = [tax_data_id];
        const response = await this.db.query(text,value).catch((error) =>{
            logError(error)
            throw new Api500Error('Database error')
        });
        if(response.rowCount === 0){
            throw new Api404Error(`Tax data record with id ${tax_data_id} has not been found`)
        }
        return `Tax data record with id ${tax_data_id} has been deleted successfully`
    }

    async updateTaxData(taxDataObj, tax_data_id){
        const text = 'UPDATE tax_data SET consumption_periode = $1, energy_tax=$2, reduction = $3, compensation_chw = $4, water_charges=$5 WHERE tax_data_id=$6';
        const values = [taxDataObj.consumption_periode,taxDataObj.energy_tax, taxDataObj.reduction, taxDataObj.compensation_chw, taxDataObj.water_charges, tax_data_id];
        const response = await this.db.query(text,values).catch((error)=>{
            if(error.code == 23505){
                throw new Api400Error(`Record with consumption periode ${taxDataObj.consumption_periode} already exists.`)
            }
            logError(error);
            throw new Api500Error('Database error')
        });
        if(response.rowCount === 0){
            throw new Api404Error(`Tax data record with id ${tax_data_id} has not been found`)
        }
        return `Tax data record with id ${tax_data_id} has been updated successfully`
    }

    async getAllTaxData(){
        const text = 'SELECT * FROM tax_data ORDER BY consumption_periode'
            const response = await this.db.query(text).catch((error) => {
                logError(error)
                throw new Api500Error('Database error');
            });
            const taxData = response.rows;
            return taxData;
    }

    
}
export default taxDataRepo;