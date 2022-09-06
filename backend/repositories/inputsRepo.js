import Api400Error from "../errorHandling/api400Error.js";
import Api500Error from "../errorHandling/api500Error.js";
import { logError } from "../errorHandling/errorHandler.js";

class inputsRepo {
  constructor(db) {
    this.db = db;
  }
  async createInput(inputsObj) {
    const text =
      "INSERT INTO inputs(consumption_periode,el_invoice_amount,period_consumption_kwh,calculated_chw,water_invoice_amount,period_consumption_m3,vat_percentage) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING input_id";
    const values = [
      inputsObj.consumption_periode,
      inputsObj.el_invoice_amount,
      inputsObj.period_consumption_kwh,
      inputsObj.calculated_chw,
      inputsObj.water_invoice_amount,
      inputsObj.period_consumption_m3,
      inputsObj.vat_percentage,
    ];
    
      const response = await this.db.query(text, values).catch((error) => {
        logError(error);
        new Api500Error('Database error');
    });;
      if(response.rows.length === 0){
        throw new Api400Error('Invalid input data')
      }
      const data = response.rows[0];
      return data;
   
  }
}
export default inputsRepo;
