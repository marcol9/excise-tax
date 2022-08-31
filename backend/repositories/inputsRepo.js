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
    try {
      const response = await this.db.query(text, values);
      const data = response.rows[0];
      return data;
    } catch (e) {
      console.log(e);
      return "database input error";
    }
  }
}
export default inputsRepo;
