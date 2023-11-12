"use strict";

const btnAdd = document.querySelector(".add-task");
const taskInput = document.getElementById("task-input");
const list = document.querySelector(".tasks");

let taskList = new Map();

const addDelete = function (item) {
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("delete-task");
  closeBtn.addEventListener("click", deleteTask);
  closeBtn.textContent = "X";
  // item.append(closeBtn);
  item.append(closeBtn);
  // item.insertAdjacentElement('afterend', closeBtn);
};
const deleteTask = function (e) {
  console.log("delete", e.target);
  if (e.target.classList.contains("delete-task")) {
    taskList.delete(
      this.parentNode.textContent.slice(
        0,
        this.parentNode.textContent.length - 1
      )
    );
    console.log("sildim");
    localStorage.setItem(
      "tasks",
      JSON.stringify(Array.from(taskList.entries()))
    );
    this.parentNode.remove();
  }
};
const init = function () {
  // localStorage.clear();
  taskList = new Map(JSON.parse(localStorage.getItem("tasks"))) || new Map();
  // console.log("task list ", taskList.get("abc"));
  // [...localStorage.getItem("tasks").split(",")].map((item) => item);
  console.log(taskList);
  for (const [task, isComplete] of taskList) {
    const li = document.createElement("li");
    //create span
    const span = document.createElement("SPAN");
    span.textContent = task;

    li.classList.add("task-item");
    //add span
    li.append(span);
    addDelete(li);
    if (isComplete) {
      span.classList.add("completed");
      li.classList.add("completedItem");
      li.lastChild.style.color = "white";
    }
    li.addEventListener("click", (e) => {
      if (e.target.classList.contains("task-item")) {
        console.log("na");
        li.firstChild.classList.toggle("completed");
        li.classList.toggle("completedItem");
        console.log(li.lastChild);
        li.lastChild.style.color = li.firstChild.classList.contains("completed")
          ? "white"
          : "black";
        taskList.set(task, li.firstChild.classList.contains("completed"));
        localStorage.setItem(
          "tasks",
          JSON.stringify(Array.from(taskList.entries()))
        );
        console.log(task);
        console.log("tasklist", taskList);
      }
    });
    list.insertBefore(li, list.lastChild);
  }
};
init();

const addEvent = function () {
  if (taskInput.value) {
    const li = document.createElement("li");
    const span = document.createElement("SPAN");
    span.textContent = taskInput.value;

    li.classList.add("task-item");
    li.appendChild(span);
    addDelete(li);
    li.addEventListener("click", () => {
      li.firstChild.classList.toggle("completed");
      li.classList.toggle("completedItem");
      console.log("abc", li.lastChild);
      li.lastChild.style.color = li.classList.contains("completedItem")
        ? "white"
        : "black";
      taskList.set(
        li.firstChild.textContent.slice(
          0,
          li.firstChild.textContent.length - 1
        ),
        li.classList.contains("completedItem")
      );
      localStorage.setItem(
        "tasks",
        JSON.stringify(Array.from(taskList.entries()))
      );
      console.log(taskList);
    });

    console.log(taskList);
    list.append(li);

    taskList.set(taskInput.value, false);
    // add task to local storage
    localStorage.setItem(
      "tasks",
      JSON.stringify(Array.from(taskList.entries()))
    );

    taskInput.value = "";
  } else {
    alert("Task name cant be empty");
  }
};

btnAdd.addEventListener("click", addEvent);

// const addClose = () => {
//   const allItems = document.querySelectorAll("li");

//   for (const item of allItems) {
//     addDelete(item);
//   }
// };
addClose();
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addEvent();
});
