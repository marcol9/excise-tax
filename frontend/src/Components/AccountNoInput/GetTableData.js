import React from "react";
import KontoInputField from "./KontoInputField";

function toNegativeNumber(num) {
  return -Math.abs(num);
}

function getTableData(calculationsObj, inputsObj) {
  const data = [
    {
      key: "1",
      bogfores: <u>Elforbrug</u>,
    },
    {
      key: "2",
      bogfores: "Debiteres på konto for elforbrug (aut. momstræk)",
      konto: (
        <KontoInputField formItemName={"debited_el_cons"}></KontoInputField>
      ),
      belob: inputsObj.el_invoice_amount,
    },

    {
      key: "3",
      bogfores: "Krediteres på kreditorkonto for elleverandøren",
      konto: (
        <KontoInputField
          formItemName={"credited_el_cons_supplier"}
        ></KontoInputField>
      ),
      belob: toNegativeNumber(inputsObj.el_invoice_amount),
    },

    {
      key: "4",
      bogfores: "Debiteres på konto for elafgift",
      konto: (
        <KontoInputField formItemName={"debited_el_tax"}></KontoInputField>
      ),
      belob: calculationsObj.reimb_el_tax,
    },

    {
      key: "5",
      bogfores: "Krediteres på konto for elforbrug - NB: Slet aut. moms..!",
      konto: (
        <KontoInputField formItemName={"credited_el_cons"}></KontoInputField>
      ),
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
      konto: (
        <KontoInputField formItemName={"debited_water_cons"}></KontoInputField>
      ),
      belob: inputsObj.water_invoice_amount,
    },

    {
      key: "9",
      bogfores: "Krediteres på kreditorkonto for vandleverandøren",
      konto: (
        <KontoInputField
          formItemName={"credited_water_cons_supplier"}
        ></KontoInputField>
      ),
      belob: toNegativeNumber(inputsObj.water_invoice_amount),
    },

    {
      key: "10",
      bogfores: "Debiteres på konto for vandafgift",
      konto: (
        <KontoInputField formItemName={"debited_water_tax"}></KontoInputField>
      ),
      belob: calculationsObj.reimb_water_tax,
    },

    {
      key: "11",
      bogfores: "Krediteres på konto for vandforbrug - NB: Slet aut. moms..!",
      konto: (
        <KontoInputField formItemName={"credited_water_cons"}></KontoInputField>
      ),
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
      konto: (
        <KontoInputField
          formItemName={"debited_automatically"}
        ></KontoInputField>
      ),
      belob: calculationsObj.deduct_el_tax + calculationsObj.deduct_water_tax,
    },

    {
      key: "15",
      bogfores: "Momsen krediteres på konto for elforbrug",
      konto: (
        <KontoInputField formItemName={"vat_credited_el"}></KontoInputField>
      ),
      belob: toNegativeNumber(calculationsObj.vat_el),
    },

    {
      key: "16",
      bogfores: "Momsen krediteres på konto for vandforbrug",
      konto: (
        <KontoInputField formItemName={"vat_credited_water"}></KontoInputField>
      ),
      belob: toNegativeNumber(calculationsObj.vat_water),
    },
  ];
  return data;
}

export default getTableData;
