//Create a todo

function todo(title, description, date = null, priority = null){

  return{
    done: false,
    title,
    description,
    date,
    priority,
  }
}


function display_todo_screen(todo){
  const container = create_html('div', 'todo-screen', undefined);

  const todo_back = create_html('a', 'todo-back', 'X');

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

  const todo_check = create_html('input', 'todo_check', undefined);
  todo_check.setAttribute('type', 'checkbox');

  const todo_title = create_html('a', 'todo-title', todo.title);

  todo_check.addEventListener('change', () => {
    todo.done = !todo.done;
    todo_title.classList.toggle('done');
  });

  const todo_delete = create_html('a', 'todo-delete', 'X');

  container.appendChild(todo_check);
  container.appendChild(todo_title);
  container.appendChild(todo_delete);

  return container;

}

function create_html(tag, classList = null, content = null){
  const html = document.createElement(tag);
  if(classList) html.classList.add(classList);
  if(content) html.textContent = content;
  return html;
}


export{todo, display_todo_screen, display_todo_list}