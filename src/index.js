import { projectsList } from "./logic";
import { deleteElement as domClear} from "./DOM" ;
import { addProject as domProject, taskTab, modal} from "./Dom";

modal();

if(localStorage.length < 1) {
    newProject('Main');
};

const addBtn = document.getElementById('projectForm');
addBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    newProject(e.target.elements[0].value);
});

const taskBtn = document.getElementById('taskForm');
taskBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    newTask(e.target.elements);
});

function projectDelete (btn) {
    btn.addEventListener('click', event => deleteProject(event));
};

function taskDelete (btn) {
    btn.addEventListener('click', event => deleteTask(event));
};

function deleteProject(e) {
    console.log(e);
    projectsList.removeProject(e.srcElement.dataset.idp);
    domClear('project', e.srcElement.dataset.idp);
};

function newProject(name) {
    if (projectsList.projects.length != 0 && projectsList.projects[projectsList.projects.length - 1].pid >= projectsList.projects.length) {
        const btn = domProject(name,projectsList.projects[projectsList.projects.length - 1].pid + 1);
        projectDelete(btn);
    } else {
        const btn = domProject(name,projectsList.projects.length);
        projectDelete(btn);
    }
    projectsList.addProject(name);
};

function newTask(e) {
    if(projectsList.projects[0].tasks.length != 0 && projectsList.projects[0].tasks[projectsList.projects[0].tasks.length - 1 ].id >= projectsList.projects[0].tasks.length) {
        const element = taskTab(e, projectsList.projects[0].tasks[projectsList.projects[0].tasks.length - 1].id + 1);
        taskDelete(element);
    } else { 
        const element = taskTab(e, projectsList.projects[0].tasks.length);
        taskDelete(element);
    }
    projectsList.projects[0].addTask(e[0].value, e[1].value, e[2].value, e[3].value);
};

function deleteTask(e, id = 0) {
    console.log(projectsList.projects[id].tasks)
    projectsList.projects[id].removeTask(e.srcElement.dataset.idt);
    domClear('task',e.srcElement.dataset.idt);
};