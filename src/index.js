import {todo, display_todo_screen, display_todo_list} from './todo.js';
import './style.css';

const test = todo('Jeff', 'Hi my name ', '6/30/22');

const test_display = display_todo_list(test);

document.body.appendChild(test_display);