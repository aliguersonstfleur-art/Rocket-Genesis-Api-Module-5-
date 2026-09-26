/* *************************
 * ENVIRONMENT CONFIGURATION
 ***************************/
import dotenv from "dotenv";
dotenv.config();


/* *****************
 * CORE DEPENDENCIES
 *******************/
import express from "express";


/* ********************
 * SERVER CONFIGURATION
 **********************/
const PORT = process.env.PORT || 3004;
const ENV = process.env.NODE_ENV || 'development';
const app = express();


/* ***********************
 * GLOBAL MIDDLEWARE SETUP
 *************************/
import loggerMiddleware from "./src/shared/middleware/loggerMiddleware.js";
app.use(express.json());
app.use(loggerMiddleware);


/* *************
* ROUTE IMPORTS
***************/
import healthRoutes from "./src/routes/health.routes.js";
import agentRoutes from "./src/routes/agent.routes.js";
import regionRoutes from "./src/routes/region.routes.js";
import moduleFourRoutes from "./src/routes/moduleFour.routes.js";
import MongoManager from "./mongo-manager.js";
// ... add more routes here as you build them


/* *************
* MOUNT ROUTES
***************/
healthRoutes.healthRoutes(app);
agentRoutes.agentRoutes(app);
regionRoutes.regionRoutes(app);
moduleFourRoutes.moduleFourRoutes(app);
// ... add more mount routes here as you build them


/* **************
 * ERROR HANDLING
 ****************/
// 404 handler for unmatched routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        message: `${req.method} ${req.originalUrl} does not exist`,
        timestamp: new Date().toISOString()
    });
});


/* **************
 * SERVER STARTUP
 ****************/
MongoManager.openMongoConnection();

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 Environment: ${ENV || 'development'}`);
    console.log(`🔗 Base URL: http://localhost:${PORT}`);
});
