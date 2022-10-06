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
import userService from "../services/userService.js";
import userRepo from "../repositories/userRepo.js";
import prerequisitesRepo from "../repositories/prerequisitesRepo.js";
import prerequisitesService from "../services/prerequisitesService.js";


//Implementation of repositories and services

const inputsRepoImpl = new inputsRepo(db);
const taxDataRepoImpl = new taxDataRepo(db);
const calculationsRepoImpl = new calculationsRepo(db);
const accountNoRepoImpl = new accountNoRepo(db);
const reportRepoImpl = new reportRepo(db);
const userRepoImpl = new userRepo(db)
const prerequisitesRepoImpl = new prerequisitesRepo(db)
const reportServiceImpl = new reportService(reportRepoImpl);
const inputServiceImpl = new inputsService(inputsRepoImpl, taxDataRepoImpl);
const accountNoServiceImpl = new accountNoService(accountNoRepoImpl);
const calculationsServiceImpl = new calculationsService(calculationsRepoImpl, taxDataRepoImpl);
const taxDataServiceImpl = new taxDataService(taxDataRepoImpl);
const userServiceImpl = new userService(userRepoImpl);
const prerequisitesServiceImpl = new prerequisitesService(prerequisitesRepoImpl);

export {
  inputServiceImpl,
  taxDataServiceImpl,
  calculationsServiceImpl,
  accountNoServiceImpl,
  reportServiceImpl,
  userServiceImpl,
  prerequisitesServiceImpl
};
