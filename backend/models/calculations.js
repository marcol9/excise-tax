class calculations {
    constructor(calculation_id, taxes_total_el, not_reimb_tax,vat_el,el_and_vat,taxes_water_total,vat_water,water_and_vat,taxes_and_vat_total,reimb_el_tax,reimb_water_tax,deduct_el_tax,deduct_water_tax,reimb_tax_and_vat){
        this.calculation_id = calculation_id;
        this.taxes_total_el = taxes_total_el;
        this.not_reimb_tax = not_reimb_tax;
        this.vat_el = vat_el;
        this.el_and_vat = el_and_vat;
        this.taxes_total_el = taxes_and_vat_total;
        this.taxes_water_total = taxes_water_total;
        this.vat_water = vat_water;
        this.water_and_vat = water_and_vat;
        this.reimb_el_tax = reimb_el_tax;
        this.reimb_water_tax = reimb_water_tax;
        this.deduct_el_tax = deduct_el_tax;
        this.deduct_water_tax = deduct_water_tax;
        this.reimb_tax_and_vat = reimb_tax_and_vat;
    }
    
    constructor(taxes_total_el, not_reimb_tax,vat_el,el_and_vat,taxes_water_total,vat_water,water_and_vat,taxes_and_vat_total,reimb_el_tax,reimb_water_tax,deduct_el_tax,deduct_water_tax,reimb_tax_and_vat){
        this.taxes_total_el = taxes_total_el;
        this.not_reimb_tax = not_reimb_tax;
        this.vat_el = vat_el;
        this.el_and_vat = el_and_vat;
        this.taxes_total_el = taxes_and_vat_total;
        this.taxes_water_total = taxes_water_total;
        this.vat_water = vat_water;
        this.water_and_vat = water_and_vat;
        this.reimb_el_tax = reimb_el_tax;
        this.reimb_water_tax = reimb_water_tax;
        this.deduct_el_tax = deduct_el_tax;
        this.deduct_water_tax = deduct_water_tax;
        this.reimb_tax_and_vat = reimb_tax_and_vat;
    }
    
}
export default calculations;