const addUserForm = document.getElementById('add-user-form')
const userList = document.getElementById('user-list')

getUsers().then(showUsers)

addUserForm.onsubmit = () => addUser(getFormData(addUserForm))

function addUser(user) {
  return fetch('/api/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  })
    .then(getUsers)
    .then(showUsers)
    .then(() => addUserForm.reset())
    .catch(console.error)
}

function getFormData(form) {
  const formData = new FormData(form)
  const user = Object.fromEntries(formData)

  Object.assign(user, {age: +user.age, hobbies: []})
  
  return user
}

function getUsers() {
  return fetch('/api/users')
    .then(response => response.json())
}

function showUsers(users) {
  userList.innerHTML = users.map(user => `
    <li>${user.username}</li>
  `).join('')
}
