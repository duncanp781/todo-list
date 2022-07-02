import {create_html, switch_screens} from './utility.js';
import {project, display_project} from './project.js';

const sidebar = (function(){
  let projects = [];
  let currProject = null;

  const add_project = (newProject) => {
    projects.push(newProject);
  }

  const delete_project = (oldProject) =>{
    for(let i = 0; i < projects.length; i++){
      if (projects[i] == oldProject){
        projects.splice(i,1);
        break;
      }
    }
  }


  return { 
    projects,
    add_project,
    delete_project,
  }
})();



function display_sidebar(){
  const container = create_html('div', 'sidebar', undefined);

  const title = create_html('h1', 'sidebar-title', 'Projects:');
  container.appendChild(title);

  sidebar.projects.forEach((proj) => {
    const project_link = create_html('a', 'sidebar-link', proj.title); 
    project_link.addEventListener('click', () => switch_screens(display_project(proj)));

    container.append(project_link);
  })


  return container;
}

export {sidebar, display_sidebar}