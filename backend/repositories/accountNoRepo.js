import Api400Error from "../errorHandling/api400Error.js";
import Api500Error from "../errorHandling/api500Error.js";
import { logError } from "../errorHandling/errorHandler.js";

class AccountNoRepo {
  constructor(db) {
    this.db = db;
  }
  async createAccountNumbers(accNumbersObj) {
    const text =
      "INSERT INTO acc_numbers(debited_el_cons,credited_el_cons_supplier,debited_el_tax,credited_el_cons,debited_water_cons,credited_water_cons_supplier,debited_water_tax,credited_water_cons,debited_automatically,vat_credited_el,vat_credited_water) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING acc_numbers_id";
    const values = [
      accNumbersObj.debited_el_cons,
      accNumbersObj.credited_el_cons_supplier,
      accNumbersObj.debited_el_tax,
      accNumbersObj.credited_el_cons,
      accNumbersObj.debited_water_cons,
      accNumbersObj.credited_water_cons_supplier,
      accNumbersObj.debited_water_tax,
      accNumbersObj.credited_water_cons,
      accNumbersObj.debited_automatically,
      accNumbersObj.vat_credited_el,
      accNumbersObj.vat_credited_water,
    ];
    
      const response = await this.db.query(text, values).catch((error) => {
        logError(error);
        throw new Api500Error('Database error');
      });
      if(response.rows.length === 0){
        throw new Api400Error('Invalid account number data')
      }
      const data = response.rows[0];
      return data;
     
  }
}
export default AccountNoRepo;
