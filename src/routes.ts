import { Router } from 'express';
import multer from 'multer';
import UsersController from './controllers/UsersControllers';
import FilesController from './controllers/FilesControllers';
import LoginController from './controllers/loginController';
import MultConfig from './config/multer';
import DocumentController from './controllers/DocumentController';

const routes = Router();

routes
  .get('/users', UsersController.find)
  .post('/users', UsersController.create)
  .put('/users', UsersController.update)
  .put('/users/item', UsersController.addItem)
  .put('/users/done', UsersController.setDoneItems)
  .delete('/users', UsersController.delete)
  .delete('/users/fake', UsersController.fakeDelete)

  .get('/document', DocumentController.find)
  .post('/document', DocumentController.create)
  .put('./document', DocumentController.update)

  .get('/login', LoginController.login)

  .get('/files', FilesController.find)
  .post('/files', multer(MultConfig).single('file'), FilesController.create)
  .delete('/files', FilesController.delete)

  // Get all wrong routes
  .all('*', (req, res) => res.status(404).json({ error: 'Route not found' }));

export default routes;
