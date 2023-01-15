import  dotenv from 'dotenv';

import  http from 'node:http';

import { router, match } from './routers.js';

dotenv.config();
const PORT = process.env.PORT ?? 8000;

const httpServer = http.createServer((req, res) => {
  router(req, res, match);
})
httpServer.listen(PORT, () => console.log(`>>> HTTP server is running at http://localhost:${PORT}`));

process.on('exit', (code) => {
  if (code === 0) {
   process.kill(process.pid)
  }
 })

process.on('SIGINT', () => {
  console.log('Ctrl-C...');
  console.log('Finished all requests');
  process.exit(2);
});

process.on('SIGTERM', () => { process.exit(2)}); 
