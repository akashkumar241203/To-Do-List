function todoApp() {
    const form = document.getElementById("todo-form")
    const input = document.getElementById("todo-input")
    const addBtn = document.getElementById("add-btn")
    const list = document.getElementById('todo-list');

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        // console.log("form submitted", input.value)
        if(input.value.length > 0) addTask(input.value);
        input.value = "";
    })

    addBtn.addEventListener('click', ()=>{
        if(input.value.length > 0) addTask(input.value);
        input.value = "";
    })

    function addTask(task, status = false){
        const label = document.createElement("li");
        const span = document.createElement("span");
        const img1 = document.createElement("img");
        const img2 = document.createElement("img");
        const img3 = document.createElement("img");

        span.innerText = task;
        span.title = task;

        img1.src = status ? "assets/completed.svg" : "assets/incomplete.svg";
        img1.alt = "task-status"
        img1.addEventListener('click', ()=>{
            img1.src = img1.src.includes("incomplete") ?  "assets/completed.svg" :  "assets/incomplete.svg";
            syncTask();
        })

        img2.src = "assets/delete.svg";
        img2.alt = "task-delete"
        img2.className = "delete"
        img2.addEventListener('click', ()=>{
            // console.log("deleted clicked")
            label.remove();
            syncTask();
        })

        img3.src = "assets/edit.svg";
        img3.alt = "task-edit";
        img3.className = "edit"
        img3.addEventListener('click', () => {
            if (img3.alt === "task-edit") {
                // Switch to "Save" mode
                input.value = span.innerText;
                input.focus();
                img3.src = "assets/save.svg";
                img3.alt = "task-save";
            } else if (img3.alt === "task-save" && input.value.length > 0) {
                // Save changes and switch back to "Edit" mode
                span.innerText = input.value;
                input.value = "";
                img3.src = "assets/edit.svg";
                img3.alt = "task-edit";
            }
            syncTask();
        });


        label.append(span, img1, img2, img3);
        label.classList.add('todo-items')
        list.appendChild(label);

        syncTask();
    }

    function syncTask() {
        const currentTasks = document.querySelectorAll(".todo-items");
        let taskList = [];

        currentTasks.forEach((task) => {
            const label = task.querySelector("span").innerText;
            const status = task.querySelector("img[alt='task-status']").src.includes("completed");

            taskList.push({ label, status });
        });

        localStorage.setItem("todos", JSON.stringify(taskList));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("todos")) || [];
        savedTasks.forEach((task) => addTask(task.label, task.status));
    }

    loadTasks();
}

todoApp();