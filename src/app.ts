/** @format */

import express from 'express';
import path from 'node:path';

const app = express();

app.use(express.static(path.join(path.resolve(), '/public')));
app.use(express.json);

export default app;
