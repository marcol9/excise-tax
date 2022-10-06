import Api400Error from "../errorHandling/api400Error.js";
import Api404Error from "../errorHandling/api404Error.js";
import { validateInputs, valInt } from "../util/validators.js";

class inputService{
    constructor(inputRepo, taxDataRepo){
        this.inputRepo = inputRepo;
        this.taxDataRepo = taxDataRepo;
    }
    //saves input in DB
    async createInput(inputsObj){
        validateInputs(inputsObj)
        //checking if consumption periode exists before creating input
        const consumption_periodes_objects = await this.taxDataRepo.getConsumptionPeriodes();
        const consumption_periodes = consumption_periodes_objects.map(consumption_periodes_object => consumption_periodes_object.consumption_periode)
        if (!consumption_periodes.includes(inputsObj.consumption_periode)){
            throw new Api404Error(`Consumption periode ${inputsObj.consumption_periode} does not exist`)
        }
        return await this.inputRepo.createInput(inputsObj);
    }

    async getInput(input_id){
        if(!valInt(input_id)){
            throw new Api400Error(`Invalid input id: ${input_id}`)
        }
        return await this.inputRepo.getInput(input_id)
    }
}
export default inputService