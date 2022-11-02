import { projectsList } from "./logic";
import { deleteElement as domClear, loadTasks as domTasksLoad, clearTasks} from "./DOM" ;
import { addProject as domProject, taskTab, modal} from "./Dom";

modal();

if(localStorage.length < 1) {
    newProject('Main');
};

let currentProject = 0;
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
    projectsList.removeProject(e.srcElement.dataset.idp);
    domClear('project', e.srcElement.dataset.idp);
};

function newProject(name) {
    if (projectsList.projects.length != 0 && projectsList.projects[projectsList.projects.length - 1].pid >= projectsList.projects.length) {
        const btn = domProject(name,projectsList.projects[projectsList.projects.length - 1].pid + 1);
        projectDelete(btn[0]);
        projectChange(btn[1]);
    } else {
        const btn = domProject(name,projectsList.projects.length);
        projectDelete(btn[0]);
        projectChange(btn[1]);
    }
    projectsList.addProject(name);
};

function newTask(e) {
    if(projectsList.projects[currentProject].tasks.length != 0 && projectsList.projects[currentProject].tasks[projectsList.projects[currentProject].tasks.length - 1 ].id >= projectsList.projects[currentProject].tasks.length) {
        const element = taskTab(e, projectsList.projects[currentProject].tasks[projectsList.projects[currentProject].tasks.length - 1].id + 1);
        taskDelete(element);
    } else { 
        const element = taskTab(e, projectsList.projects[currentProject].tasks.length);
        taskDelete(element);
    }
    projectsList.projects[currentProject].addTask(e[0].value, e[1].value, e[2].value, e[3].value);
};

function deleteTask(e) {
    projectsList.projects[currentProject].removeTask(e.srcElement.dataset.idt);
    domClear('task',e.srcElement.dataset.idt);
};

function projectChange(element) {
        element.addEventListener('click', (e) => {
            if (e.target.className != 'ximg') {
                const id = e.target.attributes[e.target.attributes.length - 1].value;
                currentProject = id;
                loadTasks(id);
            }
        });
};

function loadTasks (id) {
    let project;
    for (let i = 0; i < projectsList.projects.length; i++) {
        if (projectsList.projects[i].pid == id) {
            project = projectsList.projects[i];
            break;
        }
    }
    domTasksLoad(project);
};

export { deleteTask };