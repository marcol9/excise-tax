import React from 'react';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const infoList = () => {
  
 
  return (
    <>
    <ul>
          <li>
            {" "}
            Kundens faktura indeholder ikke rykkergebyr eller andre beløb, som
            ikke er momspligtige,
          </li>
          <li> Kunden opfylder forbrugskriteriet,</li>
          <li>
            {" "}
            Vand og elektriciteten er forbrugt af den samme juridiske enhed, som
            indberetter godtgørelsen,
          </li>
          <li> Der er ikke anvendt el og/eller vand til private formål,</li>
          <li>
            {" "}
            Der er ikke sket videresalg af el og/eller vand, f.eks. salg til
            lejere, til en operatør af en ladestander eller anden tredjepart,
          </li>
          <li>
            {" "}
            Kundens godtgørelsesberettigede forbrug relaterer sig udelukkende
            til momspligtige aktiviteter,
          </li>
          <li>
            {" "}
            Der er ikke anvendt el til aktiviteter omfattet af bilag 1 til
            elafgiftsloven eller aktiviteter, der kan ligestilles hermed,
          </li>
          <li>
            {" "}
            Hvis elektricitet forbruges i ladestandere til opladning af elbiler
            mv., forudsættes det, at ladestanderen er kundens egen og ikke
            hverken drives af eller forsynes med elektricitet fra tredjepart,
          </li>
          <li>
            {" "}
            Elektriciteten stammer ikke fra et VE-anlæg, f.eks. solcelleanlæg,
            hvor der ikke er afregnet og betalt elafgift,
          </li>
          <li>
            {" "}
            Der er ikke indgået aftale om forbrugsregistrering, jf.
            elafgiftslovens § 4,
          </li>
          <li>
            {" "}
            Yderligere gør følgende forudsætninger sig gældende, hvis regnearket
            anvendes for perioden før 1. januar 2021:
          </li>
          <ul>
            <li> Der er ikke anvendt el til særlige produktionsprocesser,</li>
            <li>
              {" "}
              Periodens forbrug af elektricitet omfatter kun forbrug til proces
              og/eller målt forbrug til henholdsvis komfortkøling, opvarmning af
              rum eller af varmt vand,
            </li>
            <li>
              {" "}
              Der er ikke anvendt el til varmepumper, hvor der ikke er foretaget
              en skematisk fordeling af varmepumpens forbrug af el til
              henholdsvis varme og køl,
            </li>
          </ul>
          <li>
            {" "}
            Hvis regnearket anvendes til beregning af en kundes
            godtgørelsesberettigede elafgifter for perioder før den 1. januar
            2021, skal el til opvarmning af rum, vand eller komfortkøling være
            særskilt målt,
          </li>
          <li>
            {" "}
            Kunden kan ikke kategoriseres som kriseramt i henhold til
            EU-definition heraf, jf. punkt 2.2 i Europa-Kommissionens
            rammebestemmelser for statsstøtte til redning og omstrukturering af
            kriseramte ikke-finansielle virksomheder.
          </li>
        </ul>
        </>
  );
};

export default infoList;