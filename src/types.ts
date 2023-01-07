
export interface IUserInfo {
  username: string;
  age: number;
  hobbies: string[];
}

export  interface IUser  extends IUserInfo {
  id: string;
}

