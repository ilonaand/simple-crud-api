const title = document.getElementById('title')
const addUserForm = document.getElementById('add-user-form')
const userTable = document.getElementById('user-table')

if (location.host != '127.0.0.1:5500') main()
else document.title = title.innerText = 'live ' + document.title

function main() {
  userTable.tBodies[0].innerHTML = ''

  getUsers().then(showUsers)
  
  addUserForm.onsubmit = () => addUser(getFormData(addUserForm))

  userTable.onclick = ({target}) => {
    if (target.classList.contains('del-btn')) {
      const id = target.closest('tr').dataset.id
      deleteUser(id).then(getUsers).then(showUsers)
    }
  }
}

function deleteUser(id) {
  return fetch(`/api/users/${id}`, {method: 'DELETE'})
}

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
  userTable.tBodies[0].innerHTML = users.map(user => `
    <tr data-id="${user.id}">
      <td>${user.username}</td>
      <td>${user.age}</td>
      <td>${user.hobbies.join(', ')}</td>
      <td>
        <button class="del-btn">Delete</button>
      </td>
    </tr>
  `).join('')
}
