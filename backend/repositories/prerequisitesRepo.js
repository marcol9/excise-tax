import Api400Error from "../errorHandling/api400Error.js";
import Api404Error from "../errorHandling/api404Error.js";
import Api500Error from "../errorHandling/api500Error.js";
import { logError } from "../errorHandling/errorHandler.js";

class prerequisitesRepo {
  constructor(db) {
    this.db = db;
  }

  async createPrerequisites(prerequisites) {

    //creating text that will be used in prepared statement (for example: ($1), ($2), ($3);)
    let valuesText=''
    const amountOfValues = prerequisites.length
    for(let i=1; amountOfValues>=i; i++){
        if(amountOfValues === i){
        valuesText=`${valuesText} ($${i});`
        }else{
         valuesText=`${valuesText} ($${i}),`
        }
    }

    //deleting all previous records
    const textDel = `DELETE FROM prerequisites *`
    await this.db.query(textDel).catch((error) =>{
        logError(error);
        new Api500Error('Database error')
    })
    
    if(valuesText !== ''){
        const text =`INSERT INTO prerequisites(prerequisite) VALUES ${valuesText}`;
      const response = await this.db.query(text, prerequisites).catch((error) => {
        logError(error);
        new Api500Error('Database error');
    });
    }
    

    
    return 'Successfully updated prerequisites'
  }

  // returns all prerequisites
  async getPrerequisites(){
    const text = 'SELECT prerequisite FROM prerequisites'
    const response = await this.db.query(text).catch((error) =>{
        logError(error);
        new Api400Error('Database error')
    })
    if(response.rows.length === 0){
        throw new Api404Error(`Could not find any prerequisites`)
    }
    const data = response.rows;
    return data;
  }
}
export default prerequisitesRepo;
