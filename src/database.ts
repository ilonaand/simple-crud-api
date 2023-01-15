import { IUser, IUserInfo } from "./types.js";

import { v4 as  uuid } from 'uuid';

const users: IUser[] = [];

const findAll = (): IUser[] => {
  return users;
}

const findOne = (id: string): IUser | undefined => {
  return users.find((item) => item.id === id);
}

const addOne = (obj: IUserInfo): IUser => {
  const user: IUser  = {
    id: uuid(),
    username: obj.username,
    age: obj.age,
    hobbies: obj.hobbies,
  }
  users.push(user);
  return user;
}

const updateOne = (id: string, obj: IUserInfo): IUser | undefined => {
  const foundIndex = users.findIndex((item) => item.id === id);
  if (foundIndex < 0) return undefined;
  const user: IUser  = {
    id: id,
    username: obj.username,
    age: obj.age,
    hobbies: obj.hobbies,
  }
  users[foundIndex] = user;
  return user;
}

const deleteOne = (id: string): IUser | undefined => {
  const foundIndex: number  = users.findIndex((item) => item.id === id);
  if (foundIndex < 0) return undefined;
  const user = users[foundIndex];
  users.splice(foundIndex, 1);
  return user;
} 

export { users, findAll, findOne, addOne, updateOne, deleteOne }