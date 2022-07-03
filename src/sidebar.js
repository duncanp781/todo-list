import {
  create_html,
  switch_screens,
  create_modal,
  create_input,
  remove_modal,
} from "./utility.js";
import { project, display_project } from "./project.js";
import { storage_add_project, load_from_storage } from "./manageStorage.js";

const sidebar = (function () {
  let projects = [];

  const add_project = (newProject) => {
    projects.push(newProject);
    storage_add_project(newProject);
    display_sidebar();
  };

  const delete_project = (oldProject) => {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i] == oldProject) {
        projects.splice(i, 1);
        break;
      }
    }
  };

  const initialize = () => {
    load_from_storage();
    if (projects.length == 0) {
      const inbox = project("Inbox", []);
      add_project(inbox);
    }
    display_project(projects[0]);
    display_sidebar();
  };

  return {
    projects,
    add_project,
    delete_project,
    initialize,
  };
})();

function display_sidebar() {
  const oldSideBar = document.querySelector(".sidebar");
  if (oldSideBar) oldSideBar.remove();

  const container = create_html("div", "sidebar", undefined);

  const title = create_html("h1", "sidebar-title", "Projects:");
  container.appendChild(title);

  sidebar.projects.forEach((proj) => {
    const project_link = create_html("a", "sidebar-link", proj.title);
    project_link.addEventListener("click", () =>
      switch_screens(display_project(proj))
    );

    container.append(project_link);
  });

  const create_project_link = create_html(
    "a",
    "sidebar-create-project",
    "Create a Project"
  );
  create_project_link.addEventListener("click", create_project);

  container.appendChild(create_project_link);

  document.body.insertBefore(container, document.body.firstChild);
  return container;
}

function create_project() {
  const modal = create_modal();

  const form = create_html("form", "create-project-form", undefined);

  const form_title = create_input(
    "text",
    "create-project-title",
    "Project Title:"
  );

  const submit_button = create_html("button", "submit-button", "Submit");
  submit_button.addEventListener("click", (e) => {
    const form = document.querySelector(".create-project-form");
    let valid = form.checkValidity();

    if (valid) {
      e.preventDefault();
      const newTitle = document.getElementById("create-project-title").value;
      const newProject = project(newTitle, []);
      sidebar.add_project(newProject);

      remove_modal();
    }
  });

  form.appendChild(form_title);
  form.appendChild(submit_button);

  modal.appendChild(form);

  const form_title_input = document.getElementById("create-project-title");
  form_title_input.setAttribute("required", "true");

  return modal;
}

export { sidebar, display_sidebar };
