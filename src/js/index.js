const $ = (selector) => document.querySelector(selector);

const getStringDate = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
}

// ## Todo List 추가

// - [x] 새로운 할 일을 확인 버튼으로 추가한다.
// - [x] 새로운 할 일을 엔터키 입력으로 추가한다.
// - [x] 추가되는 할 일을 ul태그 안에 삽입한다.
// - [x] 총 할일 개수를 세어 상단에 보여준다.
// - [] 할 일이 추가되고 나면 input은 빈 값으로 초기화한다.
// - [] 사용자 입력 값이 빈 값이라면 추가되지 않는다.

function App() {
    this.curDate = new Date();
    this.todoList = [];

    this.init = () => {
        changeDate(this.curDate);
        render();
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

    const addTodo = () => {
        if($("#todo-name").value === ""){
            alert("값을 입력해주세요");
            return;
        }
        const todoName = $("#todo-name").value;
        this.todoList.push(todoName);
        render();
    }

    const countTodo = () => {
        $(".todo-count").innerText = `총 ${this.todoList.length}개`;
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

    const render = () => {
        const template = this.todoList
        .map((item, index)=>{
                return (
                    `<li class="data-todo-id=${index} todo-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 todo-name sold-out">${item}</span>
                    <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
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
}

const app = new App();
app.init();