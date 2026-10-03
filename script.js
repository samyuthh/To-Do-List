/* =========================
   SELECT ELEMENTS
========================= */

const taskInput = document.getElementById("taskInput");

const addButton = document.getElementById("addButton");

const taskList = document.getElementById("taskList");

const emptyMessage = document.getElementById("emptyMessage");

const totalCount = document.getElementById("totalCount");

const activeCount = document.getElementById("activeCount");

const completedCount =
    document.getElementById("completedCount");

const taskSummary =
    document.getElementById("taskSummary");

const clearCompleted =
    document.getElementById("clearCompleted");

const filters =
    document.querySelectorAll(".filter");


/* Current filter */

let currentFilter = "all";


/* =========================
   ADD TASK
========================= */

function addTask() {

    const taskText =
        taskInput.value.trim();


    /* Don't allow empty tasks */

    if (taskText === "") {

        taskInput.focus();

        return;
    }


    /* Create task */

    createTask(taskText);


    /* Clear input */

    taskInput.value = "";

    taskInput.focus();


    /* Update interface */

    updateUI();
}


/* =========================
   CREATE TASK
========================= */

function createTask(taskText) {

    /* Create list item */

    const taskItem =
        document.createElement("li");

    taskItem.className = "task-item";


    /* Create check button */

    const checkButton =
        document.createElement("button");

    checkButton.className =
        "check-button";

    checkButton.setAttribute(
        "aria-label",
        "Complete task"
    );


    /* Create task text */

    const text =
        document.createElement("span");

    text.className = "task-text";

    text.textContent = taskText;


    /* Create delete button */

    const deleteButton =
        document.createElement("button");

    deleteButton.className =
        "delete-button";

    deleteButton.textContent = "×";

    deleteButton.setAttribute(
        "aria-label",
        "Delete task"
    );


    /* =========================
       COMPLETE TASK
    ========================= */

    checkButton.addEventListener(
        "click",
        function() {

            taskItem.classList.toggle(
                "completed"
            );

            updateUI();

        }
    );


    /* =========================
       CLICK TEXT TO COMPLETE
    ========================= */

    text.addEventListener(
        "click",
        function() {

            taskItem.classList.toggle(
                "completed"
            );

            updateUI();

        }
    );


    /* =========================
       DELETE TASK
    ========================= */

    deleteButton.addEventListener(
        "click",
        function() {

            taskItem.remove();

            updateUI();

        }
    );


    /* Add elements to task */

    taskItem.appendChild(checkButton);

    taskItem.appendChild(text);

    taskItem.appendChild(deleteButton);


    /* Add task to list */

    taskList.appendChild(taskItem);
}


/* =========================
   UPDATE UI
========================= */

function updateUI() {

    const tasks =
        Array.from(
            taskList.children
        );


    /* Total tasks */

    const total =
        tasks.length;


    /* Completed tasks */

    const completed =
        tasks.filter(function(task) {

            return task.classList.contains(
                "completed"
            );

        }).length;


    /* Active tasks */

    const active =
        total - completed;


    /* Update counters */

    totalCount.textContent = total;

    activeCount.textContent = active;

    completedCount.textContent =
        completed;


    /* Update footer */

    taskSummary.textContent =
        total === 1
            ? "1 task"
            : `${total} tasks`;


    /* Empty state */

    updateEmptyMessage();


    /* Apply filter */

    applyFilter();
}


/* =========================
   EMPTY MESSAGE
========================= */

function updateEmptyMessage() {

    const visibleTasks =
        Array.from(
            taskList.children
        ).filter(function(task) {

            return task.style.display !== "none";

        });


    if (visibleTasks.length === 0) {

        emptyMessage.style.display =
            "block";

    } else {

        emptyMessage.style.display =
            "none";
    }
}


/* =========================
   FILTER TASKS
========================= */

function applyFilter() {

    const tasks =
        Array.from(
            taskList.children
        );


    tasks.forEach(function(task) {

        const isCompleted =
            task.classList.contains(
                "completed"
            );


        if (currentFilter === "all") {

            task.style.display = "flex";

        }

        else if (
            currentFilter === "active"
        ) {

            task.style.display =
                isCompleted
                    ? "none"
                    : "flex";

        }

        else if (
            currentFilter === "completed"
        ) {

            task.style.display =
                isCompleted
                    ? "flex"
                    : "none";
        }

    });


    updateEmptyMessage();
}


/* =========================
   FILTER BUTTONS
========================= */

filters.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            /* Remove active class */

            filters.forEach(
                function(item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            /* Add active class */

            button.classList.add("active");


            /* Set filter */

            currentFilter =
                button.dataset.filter;


            /* Update tasks */

            applyFilter();

        }
    );

});


/* =========================
   CLEAR COMPLETED
========================= */

clearCompleted.addEventListener(
    "click",
    function() {

        const completedTasks =
            document.querySelectorAll(
                ".task-item.completed"
            );


        completedTasks.forEach(
            function(task) {

                task.remove();

            }
        );


        updateUI();

    }
);


/* =========================
   ADD BUTTON
========================= */

addButton.addEventListener(
    "click",
    addTask
);


/* =========================
   ENTER KEY
========================= */

taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


/* =========================
   INITIAL UI
========================= */

updateUI();