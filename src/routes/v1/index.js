import express from "express"
const app = express();

import adminRoutes from './admin/index.js'
import userRoutes from './user/index.js'

app.use('/admin',adminRoutes)
app.use('/user',userRoutes)

export default app
