
const { Router } = require("express");

const DevController = require("./controllers/DevController")
const SearchController = require("./controllers/SearchController")

const routes = Router();

// Tipos de parâmetros:

// Query Params: req.query (Filtros, ordenação, paginação, ...)
// Route Params: req.params (Identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de um registro)

routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);
routes.get("/search", SearchController.index);
routes.put("/update/:id", DevController.update);
routes.delete("/delete/:id", DevController.destroy);


module.exports = routes;