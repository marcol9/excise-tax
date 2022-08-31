class inputService{
    constructor(inputRepo){
        this.inputRepo = inputRepo;
    }
    async createInput(inputsObj){
        return await this.inputRepo.createInput(inputsObj);
    }
}
export default inputService