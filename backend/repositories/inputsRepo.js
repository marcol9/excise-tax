import Api400Error from "../errorHandling/api400Error.js";
import Api404Error from "../errorHandling/api404Error.js";
import Api500Error from "../errorHandling/api500Error.js";
import { logError } from "../errorHandling/errorHandler.js";

class inputsRepo {
  constructor(db) {
    this.db = db;
  }
//saves inputs to DB. returns ID of newly created input
  async createInput(inputsObj) {
    const text =
      "INSERT INTO inputs(consumption_periode,el_invoice_amount,period_consumption_kwh,calculated_chw,water_invoice_amount,period_consumption_m3,vat_percentage, company_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING input_id";
    const values = [
      inputsObj.consumption_periode,
      inputsObj.el_invoice_amount,
      inputsObj.period_consumption_kwh,
      inputsObj.calculated_chw,
      inputsObj.water_invoice_amount,
      inputsObj.period_consumption_m3,
      inputsObj.vat_percentage,
      inputsObj.company_name
    ];
    
      const response = await this.db.query(text, values).catch((error) => {
        // if(error.code == 23503){
        //     throw new Api404Error(` Tax data record with consumption periode ${inputsObj.consumption_periode} not found.`)
        // }
        logError(error);
        new Api500Error('Database error');
    });
        //if ID is not returned    
      if(response.rows.length === 0){
        throw new Api400Error('Invalid input data. No record saved in database')
      }
      const data = response.rows[0];
      return data;
   
  }

  // returns record with provided id
  async getInput(input_id){
    const text = 'SELECT * FROM inputs WHERE input_id = $1'
    const value = [input_id]
    const response = await this.db.query(text,value).catch((error) =>{
        logError(error);
        new Api400Error('Database error')
    })
    if(response.rows.length === 0){
        throw new Api404Error(`Could not find input with id ${input_id}`)
    }
    const data = response.rows[0];
    return data;
  }
}
export default inputsRepo;
