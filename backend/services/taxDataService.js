class taxDataService{
    constructor(taxDataRepo){
        this.taxDataRepo = taxDataRepo;
    }
    async getTaxData(consumptionPeriode){
        return await this.taxDataRepo.getTaxData(consumptionPeriode);
    }
    async getConsumptionPeriodes(){
        return await this.taxDataRepo.getConsumptionPeriodes();
    }
}
export default taxDataService