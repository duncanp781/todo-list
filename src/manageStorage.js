import { todo } from "./todo.js";
import { project } from "./project.js";
import { sidebar } from "./sidebar.js";
import { format } from "date-fns";

let canStore = false;

//Copied from MDN
//Check if we can use local storage
function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

if (storageAvailable("localStorage")) {
  canStore = true;
} else {
  canStore = false;
}

//Idea: Store the names of all the todos and projects so that we can get them on page load
let names = [];
function get_names() {
  if (canStore) {
    let oldNames = localStorage.getItem("names");
    if (oldNames) {
      names = oldNames.split("^").filter((item) => item.length > 0);
    }
  }
}

function save_names() {
  if (canStore) {
    let out = "";
    for (let i in names) {
      out = `${out}^${names[i]}`;
    }
    localStorage.setItem("names", out);
  }
}

function add_name(newName) {
  if (canStore) {
    if (!names.includes(newName)) {
      names.push(newName);
      save_names();
    }
  }
}

function test() {
  let testTodo = todo("I am a test todo", "Just testing that all this works");
  let testProj = project("I am a test project", [testTodo]);
  storage_add_project(testProj);

  load_from_storage();
}

//Todos are saved as todo: todo.title: todo
function storage_add_todo(newTodo) {
  if (canStore) {
    //Todos carry references to their projects, and projects to their todos
    //JSON doesn't like this circularness, so we instead store the project name
    let toStore = { ...newTodo };
    toStore.projectName = toStore.project.title;
    delete toStore.project;
    toStore.date = format(toStore.date, "yyyy-MM-dd");
    localStorage.setItem(newTodo.title, JSON.stringify(toStore));
    add_name(`Todo: ${toStore.title}`);
  }
}

function storage_remove_todo(oldTodo) {
  if (canStore) {
    localStorage.removeItem(oldTodo.title);
    for (let index in names) {
      if (names[index].includes("Todo: ")) {
        let todoName = names[index].slice(6);
        if (todoName == oldTodo.title) {
          names.splice(index, 1);
          save_names();
          break;
        }
      }
    }
  }
}

function storage_get_todos() {
  if (canStore) {
    let storedTodos = [];
    for (let index in names) {
      if (names[index].includes("Todo: ")) {
        let todoName = names[index].slice(6);
        let storedTodo = JSON.parse(localStorage.getItem(todoName));
        storedTodos.push(storedTodo);
      }
    }
    return storedTodos;
  }
}

//Projects are project: project.title: project
function storage_add_project(newProject) {
  if (canStore) {
    for (let entry of newProject.todos) {
      storage_add_todo(entry);
    }
    let projCopy = { ...newProject };
    delete projCopy.todos;
    localStorage.setItem(newProject.title, JSON.stringify(projCopy));
    add_name(`Project: ${newProject.title}`);
  }
}

function storage_remove_project(oldProject) {
  if (canStore) {
    localStorage.removeItem(oldProject.title);
    for (index in names) {
      if (names[index].includes("Project: ")) {
        let projectName = names[index].slice(9);
        if (projectName == oldProject.title) {
          names.splice(index, 1);
          break;
        }
      }
    }
  }
}

//Returns an array of the stored projects
function storage_get_projects() {
  if (canStore) {
    let storedProjects = [];
    for (let index in names) {
      if (names[index].includes("Project: ")) {
        let projectName = names[index].slice(9);
        let storedProject = JSON.parse(localStorage.getItem(projectName));
        storedProjects.push(storedProject);
      }
    }
    return storedProjects;
  }
}

function load_from_storage() {
  get_names();
  let storedProjects = storage_get_projects();
  let storedTodos = storage_get_todos();
  for (let storedTodo of storedTodos) {
    let projName = storedTodo.projectName;
    //Convert the stored todo into a real todo (So that it has methods)
    let realTodo = todo(
      storedTodo.title,
      storedTodo.description,
      storedTodo.date,
      storedTodo.priority
    );
    realTodo.done = storedTodo.done;

    for (let storedProj of storedProjects) {
      //Find the todos project and add the todo to the project
      if (storedProj.title == projName) {
        storedTodo.project = storedProj;
        if (storedProj.todos) {
          storedProj.todos.push(realTodo);
        } else {
          storedProj.todos = [realTodo];
        }
      }
    }
  }

  //Now convert the stored projects to real projects so they have methods
  for (let storedProj of storedProjects) {
    let realProj = project(storedProj.title, storedProj.todos);
    sidebar.add_project(realProj);
  }
}

export {
  canStore,
  test,
  storage_add_todo,
  storage_add_project,
  storage_remove_todo,
  storage_remove_project,
  load_from_storage,
};
