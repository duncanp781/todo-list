function create_html(tag, classList = null, content = null){
  const html = document.createElement(tag);
  if(classList) html.classList.add(classList);
  if(content) html.textContent = content;
  return html;
}

function create_modal(){
  const modal = create_html('div', 'modal', undefined);

  modal.addEventListener('click', (e) => {
    if (e.target == modal){
      modal.remove();
    }
  })

  const content = create_html('div', 'modal-content', undefined);

  modal.appendChild(content);

  document.body.appendChild(modal);

  return content;
}

function remove_modal(){
  const modal = document.querySelector('.modal');
  modal.remove();
}


function switch_screens(newScreen){
  const oldScreen = document.querySelector('.screen');
  if (oldScreen) oldScreen.remove();
  document.body.appendChild(newScreen);
}

function create_input(type, id, label = ''){
  const container = create_html('div', 'input-container', undefined);

  const input = create_html('input', 'input', undefined);
  input.setAttribute('type', type);
  input.setAttribute('id', id);
  
  const labelText = create_html('label', 'label', label);
  labelText.setAttribute('for', id);

  container.appendChild(labelText);
  container.appendChild(input);

  return container;

}

function create_textArea(id, name = null, label = null, rows = '4', cols = '50'){
  const container = create_html('div', 'text-container', undefined);

  const textArea = create_html('textarea', 'text-area', undefined);
  textArea.setAttribute('id', id);
  textArea.setAttribute('rows', rows);
  textArea.setAttribute('cols', cols);
  if(name) textArea.setAttribute('name', name);

 

  if(label){ 
    const labelText = create_html('label', 'label', label);
    labelText.setAttribute('for', id);
    container.appendChild(labelText);
  }

  container.appendChild(textArea);

  return container;

}

export {create_html, switch_screens, create_modal, remove_modal, create_input, create_textArea}