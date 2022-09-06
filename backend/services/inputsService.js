import Api400Error from "../errorHandling/api400Error.js";
import { validateInputs } from "../util/validators.js";

class inputService{
    constructor(inputRepo){
        this.inputRepo = inputRepo;
    }
    async createInput(inputsObj){
        if(!validateInputs(inputsObj)){
            throw new Api400Error('Invalid input data')
        }
        return await this.inputRepo.createInput(inputsObj);
    }
}
export default inputService