const $ = (selector) => document.querySelector(selector);

const getStringDate = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
}

function App() {
    this.curDate = new Date();

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

    $("#day-decrease-button").addEventListener("click", (e)=>{
        decreaseDate();
    })

    $("#day-increase-button").addEventListener("click", (e)=>{
        increaseDate();
    })

    $("#todo-form").addEventListener("submit", (e)=>{
        e.preventDefault();
    });
}

const app = new App();
app.init();