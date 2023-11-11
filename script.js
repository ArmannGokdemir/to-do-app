"use strict";

const btnAdd = document.querySelector(".add-task");
const taskInput = document.getElementById("task-input");
const list = document.querySelector(".tasks");

let taskList = new Map();

const init = function () {
  // localStorage.clear();
  taskList = new Map(JSON.parse(localStorage.getItem("tasks"))) || new Map();
  // console.log("task list ", taskList.get("abc"));
  // [...localStorage.getItem("tasks").split(",")].map((item) => item);
  for (const [task] of taskList) {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.textContent = task;
    list.append(li);
  }
};
init();

const addEvent = function () {
  if (taskInput.value) {
    const li = document.createElement("li");
    li.textContent = taskInput.value;
    list.append(li);
    taskList.set(taskInput.value, taskInput.value);
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
const deleteTask = function () {
  taskList.delete(
    this.parentNode.textContent.slice(0, this.parentNode.textContent.length - 1)
  );

  localStorage.setItem("tasks", JSON.stringify(Array.from(taskList.entries())));
  this.parentNode.remove();
};

btnAdd.addEventListener("click", addEvent);

const addClose = () => {
  const allItems = document.querySelectorAll("li");

  for (const item of allItems) {
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("delete-task");
    closeBtn.addEventListener("click", deleteTask);
    closeBtn.textContent = "X";
    item.append(closeBtn);
  }
};
addClose();
