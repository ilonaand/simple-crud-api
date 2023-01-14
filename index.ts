import dotenv from 'dotenv';

import  http from 'node:http';

import { router, match } from './src/routers';

dotenv.config();
const PORT = process.env.PORT ?? 8000;

http.createServer((req, res) => {
  router(req, res, match);
}).listen(PORT);
