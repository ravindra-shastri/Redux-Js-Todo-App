let input = document.querySelector('.input');
let list = document.querySelector('.todo-list');

const reducer = (state = [], { type, value }) => {
  switch (type) {
    case "add":
      return [...state, value];

    case "delete":
      return state.filter((e, i) => i !== value);

    case "isDone":
      return state.map((todo, index) =>
        value === index
          ? { ...todo, isDone: !todo.isDone }
          : todo);

    default:
      return state;
  }
}

const store = Redux.createStore(reducer);
input.innerText = store.getState();


function handleTodoinput(event) {
  if (event.keyCode === 13 && event.target.value) {
    store.dispatch({
      type: "add",
      value: {
        name: event.target.value,
        isDone: false,
      }
    });
    event.targetvalue = "";
  }
}

function createUI(todos) {
  list.innerHTML = "";
  todos.forEach((element, index) => {
    let li = document.createElement('li');
    li.classList.add("list-item");

    let h1 = document.createElement('h1');
    h1.innerText = element.name;
    h1.style.color = element.isDone ? "greenyellow" : "aqua";

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = element.isDone;
    checkbox.classList.add('checkbox-icon');
    checkbox.addEventListener('click', () => {
      store.dispatch({
        type: 'isDone',
        value: index,
      });
    });

    let close = document.createElement('span');
    close.innerText = 'X';
    close.classList.add('close-btn');
    close.addEventListener('click', () => {
      store.dispatch({
        type: 'delete',
        value: index
      });
    });

    li.append(checkbox, h1, close);
    list.append(li);
  });
}

store.subscribe(() => {
  let todos = store.getState();
  createUI(todos);
});

input.addEventListener('keyup', handleTodoinput)


