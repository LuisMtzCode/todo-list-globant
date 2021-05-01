const form = document.getElementById("form-todo");
const input = document.getElementById("input-todo");
const todoList = document.getElementById("todoList");
class Todo {
    todoList = [];
    key = "todolist";

    addTodo(todo) {
        const todoElement = {
            value: todo,
            checked: false
        };
        this.todoList = [...this.todoList, todoElement];
        this.updateListLocalStorage();
    }

    removeTodo(index) {
        if (typeof this.todoList[index] !== 'undefined') {
            this.todoList.splice(index, 1);
            this.updateListLocalStorage();
        }
    }

    toggleChecked(index) {
        if (typeof this.todoList[index] !== 'undefined') {
            this.todoList[index].checked = !this.todoList[index].checked;
            this.updateListLocalStorage();
        }
    }

    refreshListHTML() {
        todoList.innerHTML = '';
        this.todoList.forEach((todo, index) => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            div.className = 'round-checkbox';

            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.id = 'todo-' + index;

            const label = document.createElement('label');
            label.setAttribute('for', 'todo-' + index);
            label.addEventListener('click', (e) => {
                this.toggleChecked(index);
            });

            const text = document.createTextNode(todo.value);
            if (todo.checked) checkbox.setAttribute('checked', true);

            const button = document.createElement('button');
            button.innerHTML = 'X';
            button.addEventListener('click', (e) => {
                this.removeTodo(index);
            });
            div.appendChild(checkbox)
            div.appendChild(label);

            li.appendChild(div);
            li.appendChild(text);
            li.appendChild(button);
            todoList.appendChild(li);
        })
    }

    getTodoListFromStorage() {
        try {
            this.todoList = JSON.parse(localStorage.getItem(this.key))
            this.refreshListHTML();
        } catch (err) {
            console.error(err);
            this.todoList = [];
        }
    }

    updateListLocalStorage() {
        try {
            localStorage.setItem(this.key, JSON.stringify(this.todoList));
        } catch (err) {
            console.error(err);
        }
        this.refreshListHTML();
    }
}

const todo = new Todo();
todo.getTodoListFromStorage();

form.addEventListener('submit', e => {
    e.preventDefault();
    if (!input.value) return;
    todo.addTodo(input.value);
    input.value = '';
});
