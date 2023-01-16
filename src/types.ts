import { IncomingMessage, ServerResponse } from "http";

export interface IUserInfo {
  username: string;
  age: number;
  hobbies: string[];
}

export  interface IUser  extends IUserInfo {
  id: string;
}

export interface IRoutesMap { [paramName: string]: IHandle };

export interface IHandle { (req: IncomingMessage , res: ServerResponse, params?: (string[] | undefined)): Promise<void> } ;

export type Match = Array<[RegExp, IHandle]>;