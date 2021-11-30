const Database = require("./src/database");

const database = new Database();

database.add('name', 15, hobbies = ['one', 'two']);

database.add('name2', 18, hobbies = ['1', '3', '5']);

database.add('name3', 13, hobbies = ['8', '10']);

database.update(database.persons[1].id, "ina", 18, ['8', '2', '6']);

database.delete(database.persons[2].id);

console.log(database.findall());