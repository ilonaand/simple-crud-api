import {  IUserInfo } from "./types.js";

export const validateUserInfo = (user: { [key: string]: any }) : user is IUserInfo => {
  const length = Object.keys(user).length === 3;

  const username = 'username' in user && typeof user['username'] === 'string' &&
    user['username'].length > 0;

  const age = 'age' in user && typeof user['age'] === 'number' &&
  user['age'] > 0;

  const hobbies = 'hobbies' in user && user['hobbies'] instanceof Array &&
    (user['hobbies'].every(item => typeof item === 'string') );

  return length && username && age && hobbies;
}