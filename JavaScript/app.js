const createForm = document.getElementById('create-form')
const todoList = document.getElementById('todo-list')
const todoModal = document.getElementById('todo-modal')
const editForm = document.getElementById('edit-form')
const overlay = document.getElementById('overlay')
const closeEl = document.getElementById('close')
let edit

// Check local storage
let todo = JSON.parse(localStorage.getItem('list'))
    ? JSON.parse(localStorage.getItem('list')) 
    : []

    if(todo.length) showTodos()

    // Show error function

    function showError(where, message) {
        document.getElementById(`${where}`).textContent = message

        setTimeout(() => {
            document.getElementById(where).textContent = ''
        }, 1500)
    }

    function setTodosLocal() {
        localStorage.setItem('list', JSON.stringify(todo))
    }

    function showTodos () {
        
            todoList.innerHTML = ''
            todo.forEach((item, i) => {
                todoList.innerHTML += `
                <li class="list-group-item d-flex justify-content-between">
        ${item}
        <div class="btn-wrapper">
                <img onclick = "editTodo(${i})" src="./images/edit.svg" alt="" width="25" height="25">
                <img onclick="deleteTodo(${i})" src="./images/delete.svg" alt="" width="25" height="25">
        </div>
        </li>
                `
            })
        
    }

    // get todo
    createForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const todoText = createForm['create-input'].value.trim()
        createForm.reset()
        if (todoText.length) {
            todo.push(todoText)
            setTodosLocal()
            showTodos()
        } else {
            showError('error-create', 'Please, enter some todo...')
        }
    })

    // delete todo
    function deleteTodo(id) {
        const newTodos = []
        todo.forEach((item, i) => {
            if(id !== i) {
                newTodos.push(item)
            }
        })
        todo = newTodos
        setTodosLocal()
        showTodos()
    }

    function editTodo(id) {
        overlay.classList.remove('hidden')
        todoModal.classList.remove('hidden')
        editId = id
    }

    closeEl.addEventListener('click', close)

    editForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const editText = editForm['edit-input'].value.trim()
        editForm.reset()
        if (editText.length) {
            todo.splice(editId, 1, editText)
            setTodosLocal()
            showTodos()
            close()
        } else {
            showError('error-edit', 'Please, enter some todo...')
        }
    })

    function close() {
        overlay.classList.add('hidden')
        todoModal.classList.add('hidden')
    }

    overlay.addEventListener('click', () => {
        overlay.classList.add('hidden')
        todoModal.classList.add('hidden')
    })

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape'){
            todoModal.classList.add('hidden')
        overlay.classList.add('hidden')
        }
    })