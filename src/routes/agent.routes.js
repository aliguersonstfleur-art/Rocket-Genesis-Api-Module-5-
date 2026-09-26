/* *******************
 * CONTROLLERS IMPORT
 *********************/
import agentControllers from '../controllers/agent.controller.js';
import baseMiddleware from '../shared/middleware/baseMiddleware.js';


/* *******************
 * ROUTE CONFIGURATION
 *********************/
const agentRoutes = (app) => {
  app.post('/agent-create', baseMiddleware, agentControllers.createAgent)
  app.get('/agents', baseMiddleware, agentControllers.getAllAgents)
  app.get('/agents-by-region', baseMiddleware, agentControllers.getAgentsByRegion)
  app.put('/agent-update-info', baseMiddleware, agentControllers.updateAgentInfo)
  app.patch('/agent-update-info', baseMiddleware, agentControllers.updateAgentInfo)
  app.delete('/agent-delete', baseMiddleware, agentControllers.deleteAgent)
  // ... add more routes here as you build them
}


/* *******
 * EXPORTS
 *********/
export default { agentRoutes };
