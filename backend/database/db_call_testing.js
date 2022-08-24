class inputs_repo {
    constructor(db){
        this.db =db;
    }

    async getTestData(){
        const response = await this.db.query('SELECT inputs_year FROM inputs');
        const data = response.rows
        return data
    }

}
export default inputs_repo