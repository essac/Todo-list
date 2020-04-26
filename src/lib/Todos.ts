import { TodosClassInterface } from './TodosClassInterface';

import { Todo } from './TodoInterface';

export class Todos implements TodosClassInterface {
    todos: Todo[];

    constructor() {
        this.todos = [{
            id: 1,
            text: 'Todo #1',
            status: 'ongoing',
            position: 1
        },
        {
            id: 2,
            text: 'Todo #2',
            status: 'ongoing',
            position: 2
        },
        {
            id: 3,
            text: 'Todo #3',
            status: 'ongoing',
            position: 3
        }]
    }

    getTodos(): Promise<Todo[]> {
        let promise: any = new Promise((resolve, reject) => {
            resolve(this.todos);
        });
        return promise;
    }

    addTodo(todo: Todo): Promise<Todo> {
        this.todos.push(todo);

        let promise: any = new Promise((resolve, reject) => {
            resolve(todo);
        });
        return promise;
    }

    deleteTodo(id: number): Promise<Todo[]> {
        let i = 0;
        for (let todo of this.todos) {
            if (id == todo.id) {
                this.todos.splice(i, 1);

                let promise: any = new Promise((resolve, reject) => {
                    resolve(this.todos);
                });
                return promise;
            }
            i++;
        }
    }

    checkTodo(todo: Todo, isChecked: boolean): Promise<Todo> {
        let promise: any = new Promise((resolve, reject) => {
            const selectedTodo = this.todos.find(t => t.id == todo);

            if (isChecked) {
                selectedTodo.status = 'done';
            } else {
                selectedTodo.status = 'ongoing'
            }
            resolve(selectedTodo);
        });
        return promise;
    }


    checkPosition(todo: Todo, sortType: string): Promise<Todo> {
        let promise: any = new Promise((resolve, reject) => {
            let selectedTodo = this.todos.find(t => t.id == todo);

            let myPos = selectedTodo.position;

            let newPos: any;

            if (sortType === "up") {

                if (myPos != 1) {
                    newPos = myPos - 1;

                    const todoItemOnNewPosition = this.todos.find(t => t.position === newPos);
                    selectedTodo.position = newPos;
                    todoItemOnNewPosition.position = myPos;
                }

            } else {
                if (myPos < this.todos.length) {
                    newPos = myPos + 1;

                    const todoItemOnNewPosition = this.todos.find(t => t.position === newPos);
                    selectedTodo.position = newPos;
                    todoItemOnNewPosition.position = myPos;
                }
            }

            resolve(this.todos);
        });
        return promise;
    }

    generateId(): number {
        return Math.floor(Math.random() * 10000000);
    }

}