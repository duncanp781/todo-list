import {todo, display_todo_list} from './todo.js';
import {create_html} from './utility.js';
import{add_todo_form} from './todoForm.js';

function project(title, todos){
  function add_todo(newTodo){
    todos.push(newTodo);
    newTodo.project = out;
    update();
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

  //If a project receives a new todo, it simply adds it
  function receive(newTodo){
    add_todo(newTodo);
  }

  function modify_todo(oldTodo, newTodo){
    for(let i = 0; i < todos.length; i++){
      if(todos[i] == oldTodo){
        todos[i] = newTodo;
        todos[i].project = out;
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
    modify_todo,
    update,
    receive,
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
  todo_container.appendChild(todo_button);

  container.appendChild(project_title);
  container.appendChild(todo_container);



  document.body.appendChild(container); 
  return container;

}

function add_todo_button(currProject){
  const container = create_html('div', 'add-todo', undefined);
  container.classList.add('todo-list');

  const add_button = create_html('a', 'add-todo-button', '+');
  add_button.addEventListener('click', () => {
    add_todo_form(currProject, currProject);
  });

  const desc = create_html('span', 'add-button-desc', 'Add a Todo');

  container.appendChild(add_button);
  container.appendChild(desc);
  return container;
}

export {project, display_project}