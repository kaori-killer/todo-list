const $ = (selector) => document.querySelector(selector);

const getStringDate = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
}

function App() {
    this.curDate = new Date();
    this.todoList = [];

    this.init = () => {
        changeDate(this.curDate);
        render();
    }

    const render = () => {
        const template = this.todoList
        .map((item, index)=>{
                return (
                    `<li data-todo-id=${index} class="todo-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 todo-name complete">${item}</span>
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
        $("#todo-date").innerText = getStringDate(new Date(this.curDate));        
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
        $(".todo-count").innerText = `총 ${this.todoList.length}개`;
    }

    const addTodo = () => {
        if($("#todo-name").value === ""){
            alert("값을 입력해주세요");
            return;
        }
        const todoName = $("#todo-name").value;
        $("#todo-name").value = "";
        this.todoList.push(todoName);
        render();
    }

    const editTodo = (e) => {
        const todoId = e.target.closest("li").dataset.todoId;
        const $newTodoName = e.target.closest("li").querySelector(".todo-name");
        console.log($newTodoName)
        const newTodoName = prompt("일정을 수정하세요", $newTodoName.innerText);
        this.todoList[todoId] = newTodoName;
        render();
    }

    const removeTodo = (e) => {

    }

    const completeTodo = (e) => {

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