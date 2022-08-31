class accountNoService{
    constructor(accountNoRepo){
        this.accountNoRepo = accountNoRepo;
    }
    async createAccountNumbers(accNumbersObj){
        return await this.accountNoRepo.createAccountNumbers(accNumbersObj);
    }
}
export default accountNoService