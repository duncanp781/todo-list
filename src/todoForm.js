import {
  create_html,
  create_modal,
  create_select,
  create_textArea,
  create_input,
  remove_modal,
} from "./utility.js";
import { todo } from "./todo.js";
import { format } from "date-fns";

//TODO FORM: INPUT: STARTING TODO, OUTPUT: VOID
//TO BE USED: OBJECT MUST IMPLEMENT .RECEIVE METHOD
function add_todo_form(startTodo = null, caller) {
  const modal = create_modal();

  const form = create_html("form", "add-todo-form", undefined);

  const todo_title = create_input("text", "add-todo-title", "Title:");

  const todo_due_date = create_input("date", "todo-due-date", "Due Date:");

  const todo_desc = create_textArea(
    "todo-desc-input",
    undefined,
    "Description:",
    undefined,
    undefined
  );

  const todo_prio = create_select(
    "todo-select-prio",
    "Select Priority:",
    ["none", "None"],
    ["low", "Low"],
    ["medium", "Medium"],
    ["high", "High"]
  );

  const submit = create_html("button", "submit-todo-form", "Create");
  submit.setAttribute("type", "submit");
  submit.addEventListener("click", (e) => {
    let valid = form.checkValidity();

    if (valid) {
      e.preventDefault();

      let newTitle = document.getElementById("add-todo-title").value;
      let newDesc = document.getElementById("todo-desc-input").value;
      let newDate = document.getElementById("todo-due-date").value;
      let newPrio = document.getElementById("todo-select-prio").value;

      if (newDate == "" || !newDate) newDate = undefined;
      caller.receive(todo(newTitle, newDesc, newDate, newPrio));

      remove_modal();
    }
  });

  form.appendChild(todo_title);
  form.appendChild(todo_due_date);
  form.appendChild(todo_prio);
  form.appendChild(todo_desc);
  form.appendChild(submit);

  modal.appendChild(form);

  const todo_title_input = document.getElementById("add-todo-title");
  todo_title_input.setAttribute("required", "true");
  if (startTodo.title) todo_title_input.value = startTodo.title;
  const todo_due_date_input = document.getElementById("todo-due-date");

  if (startTodo.date) {
    todo_due_date_input.value = format(startTodo.date, "yyyy-MM-dd");
  }

  const todo_desc_input = document.getElementById("todo-desc-input");
  if (startTodo.description) todo_desc_input.value = startTodo.description;

  const todo_prio_input = document.getElementById("todo-select-prio");
  if (startTodo.priority) todo_prio_input.value = startTodo.priority;
}

export { add_todo_form };
