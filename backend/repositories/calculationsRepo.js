class calculationsRepo{
    constructor(db){
        this.db = db;
    }
    async createCalculations(calculationsObj){
        const text = 'INSERT INTO calculations(taxes_total_el,not_reimb_tax,vat_el,el_and_vat,taxes_water_total,vat_water,water_and_vat,taxes_and_vat_total,reimb_el_tax,reimb_water_tax,deduct_el_tax,deduct_water_tax,reimb_tax_and_vat) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING calculation_id';
        const values = [calculationsObj.taxes_total_el, calculationsObj.not_reimb_tax,calculationsObj.vat_el ,calculationsObj.el_and_vat ,calculationsObj.taxes_water_total ,calculationsObj.vat_water ,calculationsObj.water_and_vat ,calculationsObj.taxes_and_vat_total ,calculationsObj.reimb_el_tax ,calculationsObj.reimb_water_tax ,calculationsObj.deduct_el_tax ,calculationsObj.deduct_water_tax ,calculationsObj.reimb_tax_and_vat]
        try{
        const response = await this.db.query(text,values);
        const data = response.rows[0]
        return data
        }catch(e){
        console.log(e)
        return "database input error"
        }
    }
}

export default calculationsRepo;