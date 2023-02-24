const $ = (selector) => document.querySelector(selector);

const getStringDate = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
}

// ## Todo List 추가

// - [x] 새로운 할 일을 확인 버튼으로 추가한다.
// - [] 새로운 할 일을 엔터키 입력으로 추가한다.
// - [] 추가되는 할 일을 ul태그 안에 삽입한다.
// - [] 총 할일 개수를 세어 상단에 보여주낟.
// - [] 할 일이 추가되고 나면 input은 빈 값으로 초기화한다.
// - [] 사용자 입력 값이 빈 값이라면 추가되지 않는다.

function App() {
    this.curDate = new Date();
    this.todoList = [];

    this.init = () => {
        changeDate(this.curDate);
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
    })

}

const app = new App();
app.init();