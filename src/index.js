import './style.css';

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('form > input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value;
  input.value = '';
  addTodoElement(value);
});

const todos = [
  {
    text: 'ma todo',
    done: false,
    editMode: true,
  },
  {
    text: 'pratiquer du js',
    done: true,
    editMode: false,
  },
  {
    text: 'première todo',
    done: true,
    editMode: false,
  },
];

const displayTodos = () => {
  const todoNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createEditTodo(todo, index);
    } else {
      return createTodo(todo, index);
    }
  });
  ul.innerHTML = '';
  ul.append(...todoNode);
};

const createTodo = (todo, index) => {
  const li = document.createElement('li');
  const btnDelete = document.createElement('button');
  btnDelete.innerHTML = 'Supprimer';
  const btnEdit = document.createElement('button');
  btnEdit.innerHTML = 'Editer';
  btnDelete.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteTodoElement(index); //closure
  });
  btnEdit.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleEditMode(index); //closure
  });
  li.innerHTML = `
		<span class="todo ${todo.done ? 'done' : ''}"></span>
		<p>${todo.text}</p>
  `;
  li.addEventListener('click', (e) => {
    toggleTodoElement(index);
  });
  li.append(btnEdit, btnDelete);
  return li;
};

const createEditTodo = (todo, index) => {
  const li = document.createElement('li');
  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo.text;
  const btnSave = document.createElement('button');
  btnSave.innerHTML = 'Save';
  const btnCancel = document.createElement('button');
  btnCancel.innerHTML = 'Cancel';
  btnCancel.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleEditMode(index);
  });
  btnSave.addEventListener('click', (e) => {
    e.stopPropagation();
    editTodoElement(index, input);
  });
  li.append(input, btnCancel, btnSave);
  return li;
};

const addTodoElement = (text) => {
  todos.push({
    text,
    done: false,
  });
  displayTodos();
};

const deleteTodoElement = (index) => {
  todos.splice(index, 1);
  displayTodos();
};

const toggleTodoElement = (index) => {
  todos[index].done = !todos[index].done;
  displayTodos();
};

const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodos();
};

const editTodoElement = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodos();
};

displayTodos();
