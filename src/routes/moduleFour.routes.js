import moduleFourControllers from '../controllers/moduleFour.controller.js';
import baseMiddleware from '../shared/middleware/baseMiddleware.js';

const moduleFourRoutes = (app) => {
  app.get('/status', moduleFourControllers.status)
  app.get('/error', moduleFourControllers.error)
  app.get('/email-list', baseMiddleware, moduleFourControllers.emailList)
  app.get('/region-avg', baseMiddleware, moduleFourControllers.regionAvg)
  app.post('/calc-residential', baseMiddleware, moduleFourControllers.calcResidential)
  app.post('/contact-us', baseMiddleware, moduleFourControllers.contactUs)
}

export default { moduleFourRoutes };
