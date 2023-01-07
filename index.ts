import { users, findAll, findOne, addOne, updateOne, deleteOne } from './src/database';


addOne({ username: 'user1', age: 45, hobbies: ["football"]});

console.log(users);