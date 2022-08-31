import React from "react";
import { Table } from "antd";

function toNegativeNumber(num) {
    return -Math.abs(num);
  }

  
const AccountNoTable = ({ accNumbersObj, inputsObj, calculationsObj }) =>{
    

    const columns = [
        {
          title: <b>Bogføres således</b>,
          dataIndex: "bogfores",
          key: "bogfores",
        },
        {
          title: <b>Konto</b>,
          dataIndex: "konto",
          key: "konto",
        },
        {
          title: <b>Beløb, DKK</b>,
          dataIndex: "belob",
          key: "belob",
        },
      ];

    const data = [
        {
          key: "1",
          bogfores: <u>Elforbrug</u>,
        },
        {
          key: "2",
          bogfores: "Debiteres på konto for elforbrug (aut. momstræk)",
          konto: accNumbersObj.debited_el_cons,
          belob: inputsObj.el_invoice_amount,
        },
    
        {
          key: "3",
          bogfores: "Krediteres på kreditorkonto for elleverandøren",
          konto: accNumbersObj.credited_el_cons_supplier,
          belob: toNegativeNumber(inputsObj.el_invoice_amount),
        },
    
        {
          key: "4",
          bogfores: "Debiteres på konto for elafgift",
          konto: accNumbersObj.debited_el_tax,
          belob: calculationsObj.reimb_el_tax,
        },
    
        {
          key: "5",
          bogfores: "Krediteres på konto for elforbrug - NB: Slet aut. moms..!",
          konto: accNumbersObj.credited_el_cons,
          belob: toNegativeNumber(calculationsObj.reimb_el_tax),
        },
    
        {
          key: "6",
        },
    
        {
          key: "7",
          bogfores: <u>Vandforbrug</u>,
        },
    
        {
          key: "8",
          bogfores: "Debiteres på konto for vandforbrug (aut. momstræk)",
          konto: accNumbersObj.debited_water_cons ,
          belob: inputsObj.water_invoice_amount,
        },
    
        {
          key: "9",
          bogfores: "Krediteres på kreditorkonto for vandleverandøren",
          konto: accNumbersObj.credited_water_cons_supplier,
          belob: toNegativeNumber(inputsObj.water_invoice_amount),
        },
    
        {
          key: "10",
          bogfores: "Debiteres på konto for vandafgift",
          konto: accNumbersObj.debited_water_tax,
          belob: calculationsObj.reimb_water_tax,
        },
    
        {
          key: "11",
          bogfores: "Krediteres på konto for vandforbrug - NB: Slet aut. moms..!",
          konto: accNumbersObj.credited_water_cons,
          belob: toNegativeNumber(calculationsObj.reimb_water_tax),
        },
    
        {
          key: "12",
        },
    
        {
          key: "13",
          bogfores: <b>Forudsættes bogført automatisk</b>,
        },
    
        {
          key: "14",
          bogfores: "Debiteres automatisk på konto vedr. købsmoms",
          konto: accNumbersObj.debited_automatically,
          belob: calculationsObj.deduct_el_tax + calculationsObj.deduct_water_tax,
        },
    
        {
          key: "15",
          bogfores: "Momsen krediteres på konto for elforbrug",
          konto: accNumbersObj.vat_credited_el,
          belob: toNegativeNumber(calculationsObj.vat_el),
        },
    
        {
          key: "16",
          bogfores: "Momsen krediteres på konto for vandforbrug",
          konto: accNumbersObj.vat_credited_water,
          belob: toNegativeNumber(calculationsObj.vat_water),
        },
      ];

      return (
        <>
          <Table
            className="account-numbers-table"
            pagination={false}
            columns={columns}
            dataSource={data}
            size="small"
          ></Table>
        </>
      );
}
export default AccountNoTable