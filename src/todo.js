import {create_html, switch_screens} from './utility.js';
import {display_project} from './project.js';

function todo(title, description, date = null, priority = null){
  function update(){
    display_todo_screen(todo);
  }
  return{
    project: null,
    done: false,
    title,
    description,
    date,
    priority,
    update,
  }
}


function display_todo_screen(todo){
  const container = create_html('div', 'todo-screen', undefined);
  container.classList.add('screen');

  const todo_back = create_html('a', 'todo-back', 'X');
  todo_back.addEventListener('click', () => {
    if(todo.project != null){
      switch_screens(display_project(todo.project));
    }
  });

  const todo_title = create_html('h1', 'todo-title', todo.title);

  const todo_date = create_html('div', 'todo-date', `Created: ${todo.date}`);

  const todo_desc_container = create_html('div', 'todo-desc');
  const todo_desc_label = create_html('span', 'label', 'Description:');
  const todo_desc = create_html('p', 'desc', todo.description);

  container.appendChild(todo_back);
  container.appendChild(todo_title);
  container.appendChild(todo_date);

  container.appendChild(todo_desc_container);
  todo_desc_container.appendChild(todo_desc_label);
  todo_desc_container.appendChild(todo_desc);

  return container;
}

function display_todo_list(todo){
  const container = create_html('div', 'todo-list', undefined);

  const todo_title = create_html('a', 'todo-title', todo.title);
  todo_title.addEventListener('click', () => {
    switch_screens(display_todo_screen(todo));
  });

  const todo_check = create_html('input', 'todo_check', undefined);
  todo_check.setAttribute('type', 'checkbox');
  if(todo.done){
    todo_check.setAttribute('checked', 'true');
    todo_title.classList.add('done');
  }
  todo_check.addEventListener('change', () => {
    todo.done = !todo.done;
    if(todo.done){
      todo_title.classList.add('done');
    }else{
      todo_title.classList.remove('done');
    }
  });
  
  const todo_delete = create_html('a', 'todo-delete', 'X');
  todo_delete.addEventListener('click', () => {
    if(todo.project){
      todo.project.remove_todo(todo);
    }
  });

  container.appendChild(todo_check);
  container.appendChild(todo_title);
  container.appendChild(todo_delete);

  return container;

}




export{todo, display_todo_screen, display_todo_list}