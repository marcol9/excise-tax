import Api400Error from "../errorHandling/api400Error.js";
import { formatDate } from "../util/util.js";
import { valInt, valNumber } from "../util/validators.js";

class reportService{
    constructor(reportRepo){
        this.reportRepo = reportRepo;
    }

    //saves report in DB
    async createReport(user_id, calculation_id, input_id, acc_numbers_id){
        // formatting date to dd/mm/yyyy
        const currentDay = formatDate(new Date());
        return await this.reportRepo.createReport(user_id, calculation_id, input_id, acc_numbers_id,currentDay)
    }

    async getReports(user_id){
        if(!valInt(user_id)){
            throw new Api400Error(`Invalid user id: ${user_id}`)
        }
        return await this.reportRepo.getReports(user_id);
    }

    async getReport(report_id){
        if(!valInt(report_id)){
            throw new Api400Error(`Invalid report id: ${report_id}`)
        }
        return await this.reportRepo.getReport(report_id);
    }

    async getAllReports(){
        return await this.reportRepo.getAllReports();
    }

}

export default reportService;