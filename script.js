"use strict";

const btnAdd = document.querySelector(".add-task");
const taskInput = document.getElementById("task-input");
const list = document.querySelector(".tasks");

let taskList = [];

const init = function () {
  taskList = [...localStorage.getItem("tasks").split(",")];
  for (const task of taskList) {
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
    taskList.push(taskInput.value);
    // add task to local storage
    localStorage.setItem("tasks", taskList);
    taskInput.value = "";
  } else {
    alert("Task name cant be empty");
  }
};
const deleteTask = function () {
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
