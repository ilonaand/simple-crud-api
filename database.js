const { v4:uuid} = require("uuid");
module.exports = class Database {
  constructor () {
    this.persons = [];
  }
  
  _create = (name, age, hobbies = []) => (
    { 
      id: uuid(),
      name: name,
      age: age,
      hobbies: hobbies,
    }
  );

  add (name, age, hobbies = []) {
    const newPerson = this._create(name, age, hobbies);
    this.persons.push(newPerson);
    return newPerson;
  }

  findOne (personId) {
    return this.persons.find((item) => item.id === personId);
  }

  findall () {
    return this.persons;
  }

  update (personId, name, age, hobbies = []) {
    const i = this.persons.findIndex((item) => item.id === personId); 
    if ( i < 0 ) return undefined;
    this.persons[i] = {...this.persons[i], name: name, age: age, hobbies: hobbies };
    return  this.persons[i];
  }
}