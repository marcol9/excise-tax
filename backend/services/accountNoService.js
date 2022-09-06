import Api400Error from "../errorHandling/api400Error.js";
import { validateAccNumbers } from "../util/validators.js";

class accountNoService{
    constructor(accountNoRepo){
        this.accountNoRepo = accountNoRepo;
    }
    async createAccountNumbers(accNumbersObj){
        if(!validateAccNumbers(accNumbersObj)){
            throw new Api400Error('Invalid account number data')
        }
        return await this.accountNoRepo.createAccountNumbers(accNumbersObj);
    }
}
export default accountNoService