import { IncomingMessage, ServerResponse } from 'http';

import { IHandle, IUser } from './types.js';

import { exception } from './exeptions.js';

import {  validateUserInfo } from './validate.js';

import { validate } from 'uuid';

import { findAll, findOne, addOne, updateOne, deleteOne} from './database.js';

export const handlerWithoutParams: IHandle = async (req: IncomingMessage , res: ServerResponse) => {
  if ( req.method !== 'GET' && req.method !== 'POST')  
    return  exception(req, res, 404, "Not found");
  if ( req.method ===  'GET') {
    try {
      const users = findAll();
      if (users) {
        res.writeHead(200, { "Content-Type": "application/json" });    
        res.end(JSON.stringify(users));
      } else {
        return  exception(req, res, 404, "Data not found");
      }
    } catch (error) {
      return  exception(req, res, 500, error as string);
    }
  }

  if ( req.method === 'POST') {
    try {
      let body = "";
      req.on('data', (chunk) => {
        body += chunk.toString();
        try {
          const bodyObj = JSON.parse(body);
          if (!validateUserInfo(bodyObj)) {
            return exception(req, res, 400, "body does not contain required fields"); 
          }
          const user: IUser = addOne(bodyObj);
          res.writeHead(201, { "Content-Type": "application/json" });    
          res.end(JSON.stringify(user));
        } catch (error) {
          return  exception(req, res, 500, error as string);
        }
      }); 
    } catch (error) {
      return  exception(req, res, 500, error as string);
    }
  }
};

export const handlerWithParams: IHandle = async (req: IncomingMessage , res: ServerResponse, params: string[] | undefined) => {
  if (req.method !== 'GET' && req.method !== 'PUT' && req.method !== 'DELETE')  
  return  exception(req, res, 404, "Not found");
  if (!params) return exception(req, res, 400, "userId is invalid (not uuid)");
  const id = params[0];
  if (!validate(id)) return exception(req, res, 400, "userId is invalid (not uuid)");

  if (req.method === 'GET') {
    try {
      const user = findOne(id);
      if (user) {
        res.writeHead(200, { "Content-Type": "application/json" });    
        res.end(JSON.stringify(user));
      } else {
        return  exception(req, res, 404, `record with id === ${id} doesn't exist`);
      }
    } catch (error) {
      return  exception(req, res, 500, error as string);
    }
  }

  if (req.method === 'PUT') {
    try {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
        try {
          const obj = JSON.parse(body);
          if (!validateUserInfo(obj)) {
            return exception(req, res, 400, "body does not contain required fields"); 
          }
         
          const user = updateOne(id, obj);
         
          if (user) {
            res.writeHead(200, { "Content-Type": "application/json" });    
            res.end(JSON.stringify(user));
          } else {
            return  exception(req, res, 404, `record with id === ${id} doesn't exist`);
          }
        } catch (error) {
          return  exception(req, res, 500, error as string);
        }
      }) 
    } catch (error) {
      return  exception(req, res, 500, error as string);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const user = deleteOne(id);
      if (user) {
        res.writeHead(204, { "Content-Type": "application/json" });  
        res.end(JSON.stringify(user));
      } else {
        return  exception(req, res, 404, `record with id === ${id} doesn't exist`);
      }
    } catch (error) {
      return  exception(req, res, 500, error as string);
    }
  }
}