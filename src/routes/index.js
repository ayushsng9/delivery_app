import express from "express"
const app = express();

import v1routes from './v1/index.js'

app.use('/v1',v1routes);

export default app;
