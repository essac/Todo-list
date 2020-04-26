import { Todos } from './lib/Todos.js';
let todos = new Todos();
function loadTodos() {
    todos.getTodos().then((todos) => {
        const copy = todos.slice(0);
        const sortedTodos = copy.sort((a, b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0));
        for (let todo of sortedTodos) {
            $('#todos').append(`
            <div><div id="container-${todo.id}" class="col-lg-9 col-md-9 col-sm-9 col-xs-9 todo-item-container">
            <input type="checkbox" id="${todo.id}" class="todo-checkbox" name="done" value="done">
            <p>${todo.text}</p>
        </div>

        <div class="myButton col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <button id="${todo.id}" class="deleteTodo btn btn-danger">REMOVE</button> <button id="${todo.id}" class="sortTodoUp btn btn-success">UP</button> <button id="${todo.id}" class="sortTodoDown btn btn-warning">DOWN</button>
        </div></div>
            `);
        }
    });
}
$('#todoForm').submit((e) => {
    e.preventDefault();
    let todoText = $('#todoText').val();
    const numberOfTodos = todos.todos.length;
    let newTodo = {
        id: todos.generateId(),
        text: todoText,
        status: 'ongoing',
        position: numberOfTodos + 1
    };
    todos.addTodo(newTodo).then(() => {
        $('#todos').html('');
        loadTodos();
    });
});
$(document).on('click', '.deleteTodo', (e) => {
    todos.deleteTodo(e.target.id).then((todo) => {
        $('#todos').html('');
        loadTodos();
    });
});
$(document).on('click', '.todo-checkbox', (e) => {
    const event = e.currentTarget;
    const todoIsChecked = event.checked;
    todos.checkTodo(e.target.id, todoIsChecked).then((todo) => {
        const currentStatus = todo.status;
        const selectedStyle = currentStatus === 'done' ? "line-through" : 'none';
        $(`#container-${todo.id} > p`).css("text-decoration", selectedStyle);
        $(`#container-${todo.id} > checkbox`).attr("checked");
    });
});
$(document).on('click', '.sortTodoUp', (e) => {
    todos.checkPosition(e.target.id, "up").then(() => {
        $('#todos').html('');
        loadTodos();
    });
});
$(document).on('click', '.sortTodoDown', (e) => {
    todos.checkPosition(e.target.id, "down").then(() => {
        $('#todos').html('');
        loadTodos();
    });
});
loadTodos();
