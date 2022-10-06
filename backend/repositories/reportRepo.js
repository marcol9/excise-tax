import Api400Error from "../errorHandling/api400Error.js";
import Api404Error from "../errorHandling/api404Error.js";
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
      throw new Api400Error("Invalid report data. No record saved in database");
    }
    const data = response.rows[0];
    return data;
  }

  //returns all reports with company name, that are created by user with provided ID
  async getReports(user_id){
    const text = `SELECT reports.report_id, reports.report_date, inputs.company_name, inputs.consumption_periode, calculations.reimb_tax_and_vat FROM ((reports
                   INNER JOIN inputs ON reports.input_id = inputs.input_id)
                   INNER JOIN calculations ON reports.calculation_id = calculations.calculation_id)
                   WHERE user_id = $1`
    const value = [user_id]
    const response = await this.db.query(text,value).catch((error) => {
        logError(error);
        throw new Api500Error('Database error');
    })
    
    const data = response.rows;
    return data;

  }

  // returns report with provided id
  async getReport(report_id){
    const text = 'SELECT * FROM reports WHERE report_id=$1';
    const value = [report_id];
    const response = await this.db.query(text,value).catch((error) =>{
        logError(error);
        throw new Api500Error('Database error');
    })
    if (response.rows.length === 0) {
        throw new Api404Error(`Report with id ${report_id} has not been found.`);
      }
    const data = response.rows[0];
    return data;
  }

  //returns all reports
  async getAllReports(){
    const text = 'SELECT * FROM reports';
    const response = await this.db.query(text).catch((error) =>{
        logError(error);
        throw new Api500Error('Database error');
    })
    const data = response.rows;
    return data;
  }



}
export default reportRepo;
