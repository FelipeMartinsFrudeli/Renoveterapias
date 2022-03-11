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
import CommentsController from "./controllers/CommentsController";
import ArticleController from "./controllers/ArticleController";

const routes = new Router();


// Open for without authorization users

routes.get('/', helloController.index);
routes.post('/sessions', SessionsController.create);

routes.get('/products/:page/:itemsQuantity', ProductsController.index);
routes.get('/product/:id', ProductsController.show);
routes.get('/productsTotal', ProductsController.total);

routes.post('/user', UsersController.create);

/* routes.get('/comments', CommentsController.index);
routes.get('/comments/:id/:itemsQuantity', CommentsController.show); */

routes.get('/articles/:page/:itemsQuantity', ArticleController.index);
routes.get('/article/:id', ArticleController.show);
routes.get('/articleLike/:id', ArticleController.like);


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

routes.post('/comments', CartsController.create);
routes.put('/comments/:id', CartsController.update);
routes.delete('/comments/:id', CartsController.destroy);

routes.post('/article', ArticleController.create);
routes.put('/article/:id', ArticleController.update);
routes.delete('/article/:id', ArticleController.destroy);

routes.get('/users', UsersController.index);
routes.get('/transactions', TransactionController.index);

routes.post('/admin', AdminController.create);
routes.get('/admin/:id', AdminController.show);
routes.put('/admin/:id', AdminController.update);
routes.delete('/admin/:id', AdminController.destroy);

export default routes;