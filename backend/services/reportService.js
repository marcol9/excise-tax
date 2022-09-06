import Api400Error from "../errorHandling/api400Error.js";
import { valNumber } from "../util/validators.js";

class reportService{
    constructor(reportRepo){
        this.reportRepo = reportRepo;
    }

    //saves report in DB
    async createReport(user_id, calculation_id, input_id, acc_numbers_id){
        const currentDay = new Date().toISOString().slice(0, 10);
        return await this.reportRepo.createReport(user_id, calculation_id, input_id, acc_numbers_id,currentDay)
    }

    async getReports(user_id){
        if(!valNumber(user_id)){
            throw new Api400Error('Invalid user id')
        }
        return await this.reportRepo.getReports(user_id);
    }
}

export default reportService;