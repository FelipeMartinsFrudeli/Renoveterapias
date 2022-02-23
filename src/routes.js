import { Router } from "express";

import auth from "./middlewares/auth";

import helloController from "./controllers/helloController";
import ProductsController from "./controllers/ProductsController";
import UsersController from "./controllers/UsersController";
import SessionsController from "./controllers/SessionsController";

const routes = new Router();

routes.get('/', helloController.index);
routes.post('/sessions', SessionsController.create);

routes.get('/products/:page/:itemsQuantity', ProductsController.index);
routes.get('/product/:id', ProductsController.show);
routes.get('/productsTotal', ProductsController.total);

routes.use(auth);

routes.get('/users', UsersController.index);
routes.get('/user/:id', UsersController.show);
routes.post('/user', UsersController.create);
routes.put('/user/:id', UsersController.update);
routes.delete('/user/:id', UsersController.destroy);

routes.post('/product', ProductsController.create);
routes.put('/product/:id', ProductsController.update);
routes.delete('/product/:id', ProductsController.destroy);

export default routes;