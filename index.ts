import { addOne } from './src/database';

import  http from 'node:http';

import { router, match } from './src/routers';

addOne({ username: 'user1', age: 45, hobbies: ["football"]});


http.createServer((req, res) => {
  if (!req.url) return;
  const data = router(req, res, match);
  res.end(JSON.stringify(data));
}).listen(8000);
