import { Router } from "express";
import JobTitleController from "../../controllers/jobTitle/JobTitle.controller";

const routesADM = Router();

// Listagem e Criação de hotéis no banco de dados
routesADM.post("" /*Controller de criação do hotel*/);
routesADM.get("" /*Controller de listagem dos hotéis*/);

//Alterações de dados do hotel no banco de dados
routesADM.patch("/:id" /*Controller de alteração de dados do hotel*/);
routesADM.delete("/:id" /*Controller de deleção do hotel*/);
routesADM.get("/:id" /*Controller de listagem do hotel*/);

//Criação e listagem de cargos
routesADM.post("/jobtitles", JobTitleController.create /*Controller de criação de cargos do hotel*/);
routesADM.get("/:id/jobtitles", JobTitleController.listAll /*Controller de listagem dos cargos do hotel*/);

//Alterações de dados nos cargos
routesADM.get(
  "/:id/jobtitles/:id", JobTitleController.listOne /*Controller de listagem do cargo do hotel*/
);
routesADM.patch(
  "/:id/jobtitles/:id" /*Controller de alteração de dados do cargo no hotel*/
);
routesADM.delete(
  "/jobtitles/:id", JobTitleController.delete /*Controller de deleção de dados do cargo no hotel*/
);

//Criação e listagem dos quartos do hotel
routesADM.get("/:id/rooms" /*Controller de listagem dos quartos do hotel*/);
routesADM.post("/:id/rooms" /*Controller de criação do quarto do hotel*/);

//Alterações de dados dos quartos
routesADM.get("/:id/rooms/:id" /*Controller de listagem do quarto do hotel*/);
routesADM.patch(
  "/:id/rooms/:id" /*Controller de alterações de dados do quarto do hotel*/
);
routesADM.delete("/:id/rooms/:id" /*Controller de deleção do quarto do hotel*/);

//Criação de funcionários
routesADM.post(
  "/:id/employees" /*Controller de criação dos funcionários do hotel*/
);
routesADM.get(
  "/:id/employees" /*Controller de listagem dos funcionários do hotel*/
);

export default routesADM;
