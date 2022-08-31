class reportService{
    constructor(reportRepo){
        this.reportRepo = reportRepo;
    }

    async createReport(user_id, calculation_id, input_id, acc_numbers_id){
        const currentDay = new Date().toISOString().slice(0, 10);
        return await this.reportRepo.createReport(user_id, calculation_id, input_id, acc_numbers_id,currentDay )
    }
}

export default reportService;