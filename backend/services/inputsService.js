class inputService{
    constructor(inputRepo){
        this.inputRepo = inputRepo;
    }
    createInput(inputObject){
        return this.inputRepo.createInput(inputObject);
    }
}
export default inputService