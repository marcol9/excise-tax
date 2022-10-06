class prerequisitesService {
    constructor(prerequisitesRepo) {
      this.prerequisitesRepo = prerequisitesRepo;
    }
  
    async createPrerequisites(prerequisites){
       return await this.prerequisitesRepo.createPrerequisites(prerequisites)
    }

    async getPrerequisites(){
        return await this.prerequisitesRepo.getPrerequisites();
    }
    
  }
  export default prerequisitesService;
  