import Api400Error from "../errorHandling/api400Error.js";
import Api500Error from "../errorHandling/api500Error.js";
import {logError} from '../errorHandling/errorHandler.js'

class reportRepo {
  constructor(db) {
    this.db = db;
  }
  //saves report to DB. returns ID  of newly created report 
  async createReport(user_id, calculation_id, input_id, acc_numbers_id, date) {
    const text =
      "INSERT INTO reports(user_id,calculation_id,input_id,acc_numbers_id,report_date) VALUES($1,$2,$3,$4,$5) RETURNING report_id";
    const values = [user_id, calculation_id, input_id, acc_numbers_id, date];

    const response = await this.db.query(text, values).catch((error) => {
       logError(error)
      throw new Api500Error('Database error');
    });
    //if ID is not returned
    if (response.rows.length === 0) {
      throw new Api400Error("Invalid report data");
    }
    const data = response.rows[0];
    return data;
  }

  async getReports(user_id){
    const text = 'SELECT * FROM reports WHERE user_id = $1'
    const value = [user_id]
    const response = await this.db.query(text,value).catch((error) => {
        logError(error);
        throw new Api500Error('Database error');
    })
    
    const data = response.rows;
    return data;

  }
}
export default reportRepo;
