export const store = {
    setLocalStorage(todo) {
        localStorage.setItem("todo", JSON.stringify(todo));
    },
    getLocalStorage() {
        return JSON.parse(localStorage.getItem("todo"));
    }
}