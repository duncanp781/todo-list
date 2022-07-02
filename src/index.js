import {todo, display_todo_screen} from './todo.js';
import {project, display_project} from './project.js';
import {create_modal} from './utility.js';
import './style.css';
import {sidebar, display_sidebar} from './sidebar.js';

const test1 = todo('Jeff', 'Hi my name ', new Date());
const test2 = todo('Margarita', 'Hiiiii', new Date());

const testP = project('Test', [test1, test2]);


const testP2 = project('Test 2', []);

sidebar.add_project(testP);
sidebar.add_project(testP2);

const sideB = display_sidebar();

document.body.appendChild(sideB);
