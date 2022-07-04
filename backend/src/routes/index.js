const ExhibitorsController = require('../domain/exhibitors/controllers/Exhibitors.controller');
const { createExhibitorsValidation, getOneExhibitorsValidation, destroyExhibitorsValidation, updateExhibitorsValidation } = require('../domain/exhibitors/validations/exhibitors/')

const orderController = require("../domain/orders/controllers/orders.controller");

const express = require("express");
const ProductsController = require('../domain/products/controllers/productsController');
const routes = express.Router();
const ClientsController = require("../domain/clients/controllers/clientsController");
const clientsCreateValidator = require("../domain/clients/validations/clientsCreateValidator");
const clientsUpdateValidator = require("../domain/clients/validations/clientsUpdateValidator");
const Auth = require('../middlewares/auth');


// routes.get("/login/shops", products.create); //DELETADO
routes.post("/login/clients", ClientsController.loginClient);

routes.get("/exhibitors", ExhibitorsController.getAllExhibitors);
routes.get("/exhibitors/:idExhibitors", getOneExhibitorsValidation, ExhibitorsController.getOneExhibitor);
routes.get("/exhibitors/:idExhibitors/products", getOneExhibitorsValidation, ExhibitorsController.getProductsExhibitor);
routes.post("/exhibitors", createExhibitorsValidation, ExhibitorsController.createExhibitor);
routes.put("/exhibitors/:idExhibitors", updateExhibitorsValidation, ExhibitorsController.updateExhibitor);
routes.delete("/exhibitors/:idExhibitors/deletar", destroyExhibitorsValidation, ExhibitorsController.deleteExhibitor);

routes.get("/products", ProductsController.list);
routes.get("/products/:code_product", ProductsController.findOne);
routes.get("/products/categories/:categoryName", ProductsController.findByCategory);
routes.get("/products/search/:term", ProductsController.findByTerm);
routes.post("/products/:idExhibitors", ProductsController.createProduct);
routes.put("/products/:code_product", ProductsController.updateProduct);
routes.delete("/products/:code_product/remove", ProductsController.deleteProduct);

routes.get("/clients", Auth, ClientsController.listAllClients);
routes.get("/clients/:id_client", Auth, ClientsController.listClientPerId);
routes.post("/clients", clientsCreateValidator, ClientsController.createClient);
routes.patch("/clients/:id_client", Auth, clientsUpdateValidator, ClientsController.updateClient);
routes.delete("/clients/:id_client", Auth, ClientsController.deleteClient);

routes.get("/orders", Auth, orderController.allOrders);
routes.get("/orders/:idClient", Auth, orderController.clientOrders);
routes.get("/orders/:idClient/:idOrder", Auth, orderController.detailOrder);
routes.post("/orders/:idClient", Auth, orderController.createOrder);
routes.put("/orders/:idClient/:idOrder", Auth, orderController.updateOrder);
routes.delete("/orders/:idClient/:idOrder", Auth, orderController.cancelOrder);


module.exports = routes;