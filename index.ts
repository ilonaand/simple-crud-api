import dotenv from 'dotenv';

import  http from 'node:http';

import { router, match } from './src/routers';

import { addOne } from './src/database';
addOne({ username: 'user1', age: 45, hobbies: ["football"]});

dotenv.config();
const PORT = process.env.PORT ?? 8000;

http.createServer((req, res) => {
  router(req, res, match);
}).listen(PORT);
