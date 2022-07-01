import {todo, display_todo_list} from './todo.js';
import {create_html, switch_screens, create_input, create_textArea, create_modal, remove_modal} from './utility.js';

function project(title, todos){
  function add_todo(newTodo){
    todos.push(newTodo);
    newTodo.project = out;
  }

  function remove_todo(oldTodo){
    for(let i = 0; i < todos.length; i++){
      if(todos[i] == oldTodo){
        todos.splice(i,1);
        out.update();
        break;
      }
    }
  }

  function update(){
    display_project(out);
  }
  
  let out = {
    title,
    todos,
    add_todo,
    remove_todo,
    update,
  }

  for (let item of todos){
    item.project = out;
  }
  return out;
}

function display_project(currProject){
  const oldProject = document.querySelector('.project');
  if(oldProject) oldProject.remove();

  const container = create_html('div', 'project', undefined);
  container.classList.add('screen');

  const project_title = create_html('h1', 'project-title', currProject.title);

  const todo_container = create_html('div', 'project-todos', undefined);

  for(let currTodo of currProject.todos){
    const project_todo = display_todo_list(currTodo);
    todo_container.appendChild(project_todo);
  }

  const todo_button = add_todo_button(currProject);

  container.appendChild(project_title);
  container.appendChild(todo_container);
  container.appendChild(todo_button);


  document.body.appendChild(container); 
  return container;

}

function add_todo_button(currProject){
  const container = create_html('div', 'add-todo', undefined);

  const add_button = create_html('a', 'add-todo-button', '+');
  add_button.addEventListener('click', () => add_todo_form(currProject));

  const desc = create_html('span', 'add-button-desc', 'Add a Todo');

  container.appendChild(add_button);
  container.appendChild(desc);

  return container;
}

function add_todo_form(currProject){
  const modal = create_modal(); 

  const form = create_html('form', 'add-todo-form', undefined);

  const todo_title = create_input('text', 'add-todo-title', 'Title:');
  todo_title.setAttribute('required', 'true');

  const todo_due_date =  create_input('date', 'todo-due-date','Due Date:');

  const todo_desc = create_textArea('todo-desc-input', undefined, 'Description:', undefined, undefined);

  const submit = create_html('button', 'submit-todo-form', 'Create');
  submit.setAttribute('type', 'submit');
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    let newTitle = document.getElementById('add-todo-title').value;
    let newDesc = document.getElementById('todo-desc-input').value;
    let newDate = document.getElementById('todo-due-date').value;

    if (newDate == '') newDate = undefined;

    const newTodo = todo(newTitle, newDesc, newDate, undefined);
    currProject.add_todo(newTodo);
    currProject.update();
    remove_modal();
  })

  form.appendChild(todo_title);
  form.appendChild(todo_due_date);
  form.appendChild(todo_desc);
  form.appendChild(submit);

  modal.appendChild(form);

  return modal;

}


export {project, display_project}