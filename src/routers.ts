import { IncomingMessage, ServerResponse} from 'http';

import { IRoutesMap, Match } from './types';

import { exception } from './exeptions';

import { handlerWithoutParams,  handlerWithParams} from './controllres';

import { serveFile } from './serveFile';

const routes: IRoutesMap = {
  "/api/users" : (req: IncomingMessage , res: ServerResponse ): Promise<void> => 
    handlerWithoutParams(req, res),
  "/api/users/:id": (req: IncomingMessage , res: ServerResponse, params?: string[] | undefined ): Promise<void> => 
    handlerWithParams(req, res, params)
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
  const { url, method } = req;

  if (!url) return  exception(req, res, 404, "Not found");

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

  if (!route) {
    if (method === 'GET' && !url.startsWith('/api/')) {
      return serveFile(req, res).catch(() => {
        exception(req, res, 500, 'File not found: ' + url);
      });
    }

    return  exception(req, res, 404, "record not found");
  }

  return route(req, res, params)
}
