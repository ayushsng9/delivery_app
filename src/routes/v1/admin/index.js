import express from "express"
const app = express();
import cityRoutes from './cityMaster.routes.js'
import hubRoutes from './hubMaster.routes.js'
import clusterRoutes from './clusterMaster.routes.js'
import societyRoutes from './societyMaster.routes.js'
import authRoutes from './auth.routes.js'

app.use('/city',cityRoutes);
app.use('/hub',hubRoutes);
app.use('/cluster',clusterRoutes);
app.use('/society',societyRoutes)
app.use('/auth',authRoutes)

export default app;