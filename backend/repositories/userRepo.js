import Api404Error from "../errorHandling/api404Error.js";
import Api500Error from "../errorHandling/api500Error.js";

class userRepo{
    constructor(db){
        this.db = db;
    }

    async getUser(email){
        const text = 'SELECT * FROM users WHERE email = $1'
        const value = [email]
        const response = await this.db.query(text,value).catch((error) => {
            logError(error)
            throw new Api500Error('Database error');
        });
        if(response.rows.length === 0){
            throw new Api404Error(`User with email ${email} not found`)
        }
        const userObj = response.rows[0];
        return userObj;
    }
}
export default userRepo;