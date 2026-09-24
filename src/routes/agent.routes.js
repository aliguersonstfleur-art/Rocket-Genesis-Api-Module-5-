/* *******************
 * CONTROLLERS IMPORT
 *********************/
import agentControllers from '../controllers/agent.controller.js';


/* *******************
 * ROUTE CONFIGURATION
 *********************/
const agentRoutes = (app) => {
  app.post('/agent-create', agentControllers.createAgent)
  app.get('/agents', agentControllers.getAllAgents)
  app.get('/agents-by-region', agentControllers.getAgentsByRegion)
  app.put('/agent-update-info', agentControllers.updateAgentInfo)
  app.patch('/agent-update-info', agentControllers.updateAgentInfo)
  app.delete('/agent-delete', agentControllers.deleteAgent)
  // ... add more routes here as you build them
}


/* *******
 * EXPORTS
 *********/
export default { agentRoutes };
