import db from "../database/db_connection.js";
import inputsRepo from "../repositories/inputsRepo.js";
import inputsService from "../services/inputsService.js";
import taxDataRepo from "../repositories/taxDataRepo.js";
import taxDataService from "../services/taxDataService.js";
import calculationsRepo from "../repositories/calculationsRepo.js";
import calculationsService from "../services/calculationsService.js";
import accountNoRepo from "../repositories/accountNoRepo.js";
import accountNoService from "../services/accountNoService.js";
import reportRepo from "../repositories/reportRepo.js";
import reportService from "../services/reportService.js";

const inputsRepoImpl = new inputsRepo(db);
const inputServiceImpl = new inputsService(inputsRepoImpl);
const taxDataRepoImpl = new taxDataRepo(db);
const taxDataServiceImpl = new taxDataService(taxDataRepoImpl);
const calculationsRepoImpl = new calculationsRepo(db);
const calculationsServiceImpl = new calculationsService(calculationsRepoImpl, taxDataServiceImpl);
const accountNoRepoImpl = new accountNoRepo(db);
const accountNoServiceImpl = new accountNoService(accountNoRepoImpl);
const reportRepoImpl = new reportRepo(db);
const reportServiceImpl = new reportService(reportRepoImpl);

export {
  inputServiceImpl,
  taxDataServiceImpl,
  calculationsServiceImpl,
  accountNoServiceImpl,
  reportServiceImpl,
};
