import Api400Error from "../errorHandling/api400Error.js";
import { validateTaxData, valInt, valNumber, valPeriode } from "../util/validators.js";

class taxDataService{
    constructor(taxDataRepo){
        this.taxDataRepo = taxDataRepo;
    }
    //returns tax data for specific consumption periode
    async getTaxData(consumptionPeriode){
        if(!valPeriode(consumptionPeriode)){
            throw new Api400Error(`Invalid consumption periode: ${consumptionPeriode}`)
        }
        return await this.taxDataRepo.getTaxData(consumptionPeriode);
    }
    //returns all existing consumption periodes
    async getConsumptionPeriodes(){
        return await this.taxDataRepo.getConsumptionPeriodes();
    }

    async createTaxData(taxDataObj){
        validateTaxData(taxDataObj);
        return await this.taxDataRepo.createTaxData(taxDataObj);
    }

    async deleteTaxData(tax_data_id){
        if(!valInt(tax_data_id)){
            throw new Api400Error(`Invalid tax data id: ${tax_data_id}`)
        }
         return await this.taxDataRepo.deleteTaxData(tax_data_id);
    }

    async updateTaxData(taxDataObj, tax_data_id){
        validateTaxData(taxDataObj);
        if(!valInt(tax_data_id)){
            throw new Api400Error(`Invalid tax data id: ${tax_data_id}`)
        }
       return await this.taxDataRepo.updateTaxData(taxDataObj, tax_data_id);
    }

    async getAllTaxData(){
        return await this.taxDataRepo.getAllTaxData();
    }
}
export default taxDataService