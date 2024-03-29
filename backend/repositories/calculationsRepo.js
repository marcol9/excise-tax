import Api400Error from "../errorHandling/api400Error.js";
import Api404Error from "../errorHandling/api404Error.js";
import Api500Error from "../errorHandling/api500Error.js";
import { logError } from "../errorHandling/errorHandler.js";

class calculationsRepo{
    constructor(db){
        this.db = db;
    }
    //saves calculations to DB. returns ID of newly created calculation
    async createCalculations(calculationsObj){
        const text = 'INSERT INTO calculations(taxes_total_el,not_reimb_tax,vat_el,el_and_vat,taxes_water_total,vat_water,water_and_vat,taxes_and_vat_total,reimb_el_tax,reimb_water_tax,deduct_el_tax,deduct_water_tax,reimb_tax_and_vat) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING calculation_id';
        const values = [calculationsObj.taxes_total_el, calculationsObj.not_reimb_tax,calculationsObj.vat_el ,calculationsObj.el_and_vat ,calculationsObj.taxes_water_total ,calculationsObj.vat_water ,calculationsObj.water_and_vat ,calculationsObj.taxes_and_vat_total ,calculationsObj.reimb_el_tax ,calculationsObj.reimb_water_tax ,calculationsObj.deduct_el_tax ,calculationsObj.deduct_water_tax ,calculationsObj.reimb_tax_and_vat]
        
        const response = await this.db.query(text,values).catch((error) => {
            logError(error);
            throw new Api500Error('Database error')
        });
        if(response.rows.length === 0){
            throw new Api400Error('Invalid calculation data. No record saved in database')
          }
        const data = response.rows[0]
        return data
       
    }

    //gets record with provided id
    async getCalculation(calculation_id){
        const text = 'SELECT * FROM calculations WHERE calculation_id = $1'
        const value = [calculation_id]
        const response = await this.db.query(text,value).catch((error) =>{
            logError(error);
            throw new Api500Error('Database error')
        })
        if(response.rows.length === 0 ){
            throw new Api404Error(`Calculation with id ${calculation_id} has not been found`)
        }
        const data = response.rows[0];
        return data;
    }
}

export default calculationsRepo;