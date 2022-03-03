import { Router } from "express";

import auth from "./middlewares/auth";
import admin from "./middlewares/admin";

import helloController from "./controllers/helloController";
import ProductsController from "./controllers/ProductsController";
import UsersController from "./controllers/UsersController";
import SessionsController from "./controllers/SessionsController";
import CartsController from "./controllers/CartsController";
import TransactionController from "./controllers/TransactionController";
import MessagerController from "./controllers/MessagerController";
import AdminController from "./controllers/AdminController";

const routes = new Router();


// Open for without authorization users

routes.get('/', helloController.index);
routes.post('/sessions', SessionsController.create);

routes.get('/products/:page/:itemsQuantity', ProductsController.index);
routes.get('/product/:id', ProductsController.show);
routes.get('/productsTotal', ProductsController.total);

routes.post('/user', UsersController.create);


//----------------------------------------------------------------------------------------------

// Authenticated Users Routes

routes.use(auth);

routes.get('/carts', CartsController.index);
routes.post('/carts', CartsController.create);
routes.put('/cart/:id', CartsController.update);
routes.delete('/cart/:id', CartsController.destroy);

routes.get('/transactions/:userEmail', TransactionController.show);
routes.post('/transactions', TransactionController.create);

routes.get('/user/:id', UsersController.show);
routes.put('/user/:id', UsersController.update);
routes.delete('/user/:id', UsersController.destroy);


//----------------------------------------------------------------------------------------------

// Admin Routes

routes.use(admin);

routes.post('/product', ProductsController.create);
routes.put('/product/:id', ProductsController.update);
routes.delete('/product/:id', ProductsController.destroy);

// Whatsapp API
routes.get('/openServerMessage', MessagerController.initialize);
routes.get('/closeServerMessage', MessagerController.closeServer);
routes.get('/sendMessage', MessagerController.SendMessage);

routes.get('/users', UsersController.index);
routes.get('/transactions', TransactionController.index);

routes.post('/admin', AdminController.create);
routes.get('/admin/:id', AdminController.show);
routes.put('/admin/:id', AdminController.update);
routes.delete('/admin/:id', AdminController.destroy);

export default routes;