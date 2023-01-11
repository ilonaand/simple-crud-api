import { IncomingMessage, ServerResponse} from 'http';
import { IRoutesMap, Match } from './types';
import { exception } from './exeptions';

const routes: IRoutesMap = {
  "/api/users" : (req: IncomingMessage , res: ServerResponse): void =>  {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(req.method));
  }
, 
  "/api/users/:id": (req: IncomingMessage , res: ServerResponse, params?: string[] ): void => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(params? params[0] : req.url));
  }
}

const createMatch = (routes: IRoutesMap): Match => {
  const match: Match = [];
  for (const key in routes) {
    if (key.includes(':id')) {
      const expKey = new RegExp(key.replace(':id', '(.*)')); 
      const route = routes[key];
      match.push([expKey, route]);
      delete routes[key];
    }
  }
  return  match;
}

export const match = createMatch(routes);

export const router = (req: IncomingMessage , res: ServerResponse, match: Match) => {
  const { url } = req;
  if (!url) return  exception(req, res, 404, "record not found");
  let route = routes[url];
  let params: string[] = [];
  
  if (!route) {
    for (const rx of match) {
      const p = url.match(rx[0]);
      if (p) {
        params = p;
        params.shift();
        route = rx[1];
        break;
      }
    }
  }

  if (!route) return  exception(req, res, 404, "record not found");
  return route(req, res, params)
}

