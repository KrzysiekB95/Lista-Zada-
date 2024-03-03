const tasks = [];

const addNewTask = (newTaskContent) => {
    tasks.push({
        content: newTaskContent,
        done: false,
    });

    render();
};

const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
};

const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
};

const bindEvents = () => {
    const taskList = document.querySelector(".js-taskList");
    taskList.addEventListener("click", (event) => {
        if (event.target.classList.contains("js-delete")) {
            const taskIndex = [...taskList.children].indexOf(event.target.parentElement);
            removeTask(taskIndex);
        } else if (event.target.classList.contains("js-done")) {
            const taskIndex = [...taskList.children].indexOf(event.target.parentElement);
            toggleTaskDone(taskIndex);
        }
    });
};

const render = () => {
    let htmlString = "";
    for (const task of tasks) {
        htmlString += `
            <li ${task.done ? 'style="text-decoration: line-through;"' : ""}>
                ${task.content}
                <button class="js-delete">Usuń</button>
                <button class="js-done">Zrobione</button>
            </li>
        `;
    }
    document.querySelector(".js-taskList").innerHTML = htmlString;
    bindEvents();
};

const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskContent = document.querySelector(".form__input").value.trim();
    if (newTaskContent === "") {
        return;
    }
    addNewTask(newTaskContent);
    document.querySelector(".form__input").value = "";
};

const init = () => {
    const form = document.querySelector(".form");
    form.addEventListener("submit", onFormSubmit);
    render();
    bindEvents();
};

init();
