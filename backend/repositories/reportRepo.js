class reportRepo{
    constructor(db){
        this.db = db;
    }

    async createReport(user_id, calculation_id, input_id, acc_numbers_id,date){
        const text = 'INSERT INTO reports(user_id,calculation_id,input_id,acc_numbers_id,report_date) VALUES($1,$2,$3,$4,$5) RETURNING report_id';
        const values = [user_id, calculation_id,input_id,acc_numbers_id,date]
        try{
        const response = await this.db.query(text,values);
        const data = response.rows[0]
        return data
        }catch(e){
        console.log(e)
        return "database input error"
        }
    }
}
export default reportRepo;