import Api400Error from "../errorHandling/api400Error.js";
import { validateAccNumbers, valInt } from "../util/validators.js";

class accountNoService{
    constructor(accountNoRepo){
        this.accountNoRepo = accountNoRepo;
    }
    //saves account numbers to DB
    async createAccountNumbers(accNumbersObj){
      validateAccNumbers(accNumbersObj)
        return await this.accountNoRepo.createAccountNumbers(accNumbersObj);
    }

    async getAccountNumbers(acc_numbers_id){
        if(!valInt(acc_numbers_id)){
            throw new Api400Error(`Invalid account number id: ${acc_numbers_id}`)
        }
        return await this.accountNoRepo.getAccountNumbers(acc_numbers_id);
    }
}
export default accountNoService