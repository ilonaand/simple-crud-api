const title = document.getElementById('title')
const addUserForm = document.getElementById('add-user-form')
const hobbyList = document.getElementById('hobby-list')
const hobbyInput = document.getElementById('hobby-input')
const userTable = document.getElementById('user-table')

if (location.host != '127.0.0.1:5500') main()
else document.title = title.innerText = 'live ' + document.title

addliteners()

function main() {
  hobbyList.innerHTML = userTable.tBodies[0].innerHTML = ''

  getUsers().then(showUsers)

  addUserForm.onsubmit = () => addUser(getFormData(addUserForm))

  userTable.onclick = ({ target }) => {
    if (target.classList.contains('del-btn')) {
      const id = target.closest('tr').dataset.id
      deleteUser(id).then(getUsers).then(showUsers)
    }
  }
}

function addliteners() {

  hobbyInput.onkeydown = e => {
    const { key } = e

    if (key == 'Enter') {
      const hobby = hobbyInput.value.trim()

      hobbyInput.value = ''

      if (hobby) {
        hobbyList.innerHTML += `
          <li class="chip">
            <span>${hobby}</span>
            <button class="del-btn">x</button>
          </li>
        `

        e.preventDefault()
      }
    }
  }

  hobbyList.onclick = e => {
    const { target, pointerId } = e

    if (!~pointerId) return

    if (target.classList.contains('del-btn')) {
      target.closest('li').remove()
    }
  }
}

function deleteUser(id) {
  return fetch(`/api/users/${id}`, { method: 'DELETE' })
}

function addUser(user) {
  return fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
    .then(getUsers)
    .then(showUsers)
    .then(() => addUserForm.reset())
    .then(() => hobbyList.innerHTML = '')
    .catch(console.error)
}

function getFormData(form) {
  const formData = new FormData(form)
  const user = Object.fromEntries(formData)
  const hobbies = [...hobbyList.children].map(el => el.children[0].innerText)

  Object.assign(user, { age: +user.age, hobbies })

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
