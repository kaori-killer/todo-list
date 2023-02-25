import { $ } from "./utils/dom.js";
import { store } from "./store/store.js";
import { getStringDate } from "./date/date.js";

function App() {
    this.curDate = new Date();
    this.curDateKey; 

    this.todoList = {};

    this.init = () => {
        this.todoList = store.getLocalStorage() ? store.getLocalStorage() : {};
        changeDate(this.curDate);
        render();
    }

    const render = () => {
        if(this.todoList[this.curDateKey] === undefined) { this.todoList[this.curDateKey] = []; }
        const template = this.todoList[this.curDateKey]
        .map((item, index)=>{
                return (
                    `<li data-todo-id=${index} class="todo-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 todo-name">${item}</span>
                    <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm mr-1 todo-complete-button"
                    >
                    완료
                    </button>
                    <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm mr-1 todo-edit-button"
                    >
                    수정
                    </button>
                    <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm todo-remove-button"
                    >
                    삭제
                    </button>
                </li>`
            );
        }).join(""); 
        $("#todo-list").innerHTML = template;
        countTodo();
    }

    const changeDate = (newDate) => {
        this.curDate = newDate;
        this.curDateKey = getStringDate(new Date(this.curDate)); 
        $("#todo-date").innerText = this.curDateKey;
        render();
    }

    const decreaseDate = () => {
        const nextDate = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), this.curDate.getDate()-1);
        changeDate(nextDate);
    }

    const increaseDate = () => {
        const preDate = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), this.curDate.getDate()+1);        
        changeDate(preDate);
    }

    const countTodo = () => {
        $(".todo-count").innerText = `총 ${this.todoList[this.curDateKey].length}개`;
    }

    const addTodo = () => {
        if($("#todo-name").value === ""){
            alert("값을 입력해주세요");
            return;
        }
        const todoName = $("#todo-name").value;
        $("#todo-name").value = "";
        this.todoList[this.curDateKey].push(todoName);
        store.setLocalStorage(this.todoList);
        render();
    }

    const editTodo = (e) => {
        const todoId = e.target.closest("li").dataset.todoId;
        const $newTodoName = e.target.closest("li").querySelector(".todo-name");
        const newTodoName = prompt("일정을 수정하세요", $newTodoName.innerText);
        this.todoList[this.curDateKey][todoId] = newTodoName;
        store.setLocalStorage(this.todoList);
        render();
    }

    const removeTodo = (e) => {
        if(!confirm("정말 삭제하시겠습니까?")) { return; }
        const todoId = e.target.closest("li").dataset.todoId;
        this.todoList[this.curDateKey].splice(todoId, 1);
        store.setLocalStorage(this.todoList);
        render();
    }

    const completeTodo = (e) => {
        e.target.closest("li").querySelector(".todo-name").classList.toggle("completed");
    }

    $("#day-decrease-button").addEventListener("click", (e)=>{
        decreaseDate();
    })

    $("#day-increase-button").addEventListener("click", (e)=>{
        increaseDate();
    })

    $("#todo-form").addEventListener("submit", (e)=>{
        e.preventDefault();
    });

    $("#todo-name").addEventListener("keypress", (e)=>{
        if(e.key !== "Enter") { return; }
        addTodo();
    });

    $("#todo-submit-button").addEventListener("click", addTodo);

    $("#todo-list").addEventListener("click", (e)=>{
        if(e.target.classList.contains("todo-edit-button")){ 
            editTodo(e);
            return;
        }
        if(e.target.classList.contains("todo-remove-button")){
            removeTodo(e);
            return;
        }
        if(e.target.classList.contains("todo-complete-button")){
            completeTodo(e);
            return;
        }
    });
}

const app = new App();
app.init();