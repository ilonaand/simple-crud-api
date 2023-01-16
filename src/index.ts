import  dotenv from 'dotenv';

import  http from 'node:http';

import { router, match } from './routers';

dotenv.config();
const PORT = process.env.PORT ?? 8000;

export const httpServer = http.createServer((req, res) => {
  router(req, res, match);
})
httpServer.listen(PORT, () => console.log(`>>> HTTP server is running at http://localhost:${PORT}`));

process.on('SIGINT', () => {
  httpServer.close(() => process.exit());
});;

process.on('exit', (code) => {
  if (code === 0) {
   process.kill(process.pid)
  }
 })

process.on('SIGTERM', () => { 
  httpServer.close(() => process.exit());}
); 


