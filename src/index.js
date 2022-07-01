import {todo, display_todo_screen} from './todo.js';
import {project, display_project} from './project.js';
import {create_modal} from './utility.js';
import './style.css';

const test1 = todo('Jeff', 'Hi my name ', new Date());
const test2 = todo('Margarita', 'Hiiiii', new Date());

const testP = project('Test', [test1, test2]);
const testP_display = display_project(testP);


let currScreen = testP_display;

