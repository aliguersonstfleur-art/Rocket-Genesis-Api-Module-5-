import regionControllers from '../controllers/region.controller.js';
import baseMiddleware from '../shared/middleware/baseMiddleware.js';

const regionRoutes = (app) => {
  app.post('/region-create', baseMiddleware, regionControllers.createRegion)
  app.get('/region', baseMiddleware, regionControllers.getRegion)
  app.get('/all-stars', baseMiddleware, regionControllers.getAllStars)
}

export default { regionRoutes };
