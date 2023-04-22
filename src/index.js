import { projectsList } from "./logic";
import { deleteElement as domClear, loadTasks as domTasksLoad, clearTasks, hideModal} from "./DOM" ;
import { addProject as domProject, taskTab, modal} from "./DOM";

modal();

if(localStorage.length < 1 || localStorage.getItem('list') == '[]') {
    newProject('Main');
} else {
    const projects = JSON.parse(localStorage.getItem('list'));
    projects.forEach(project => {
        newProject(project.title);
        project.tasks.forEach(task => {
            projectsList.projects[projectsList.projects.length - 1].addTask(task.title, task.dueDate, task.priority, task.description);
        })
    })
    loadTasks(0);
}

let currentProject = 0;
const addBtn = document.getElementById('projectForm');
addBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    newProject(e.target.elements[0].value);
});

const taskBtn = document.getElementById('taskForm');
taskBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = e.target.elements[0].value;
    const dueDate = e.target.elements[1].value;
    const priority = e.target.elements[2].value;
    const description = e.target.elements[3].value;
    if (projectsList.projects.length != 0) {
        newTask(title, dueDate, priority, description);
    };
    hideModal();
});

function projectDelete (btn) {
    btn.addEventListener('click', event => {
        deleteProject(event);
    });
};

function taskDelete (btn) {
    btn.addEventListener('click', event => deleteTask(event));
};

function deleteProject(e) {
    projectsList.removeProject(e.srcElement.dataset.idp);
    domClear('project', e.srcElement.dataset.idp);
    if(currentProject == e.srcElement.dataset.idp) {
        clearTasks();
    }
    localStorage.setItem('list', JSON.stringify(projectsList.projects));
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
    localStorage.setItem('list',JSON.stringify(projectsList.projects));
};

function newTask(title, due, priority, description) {
    const pid = projectsList.findProject(currentProject);
    if(projectsList.projects[pid].tasks.length != 0 && projectsList.projects[pid].tasks[projectsList.projects[pid].tasks.length - 1 ].id >= projectsList.projects[pid].tasks.length) {
        const element = taskTab(title, due, priority, description, projectsList.projects[pid].tasks[projectsList.projects[pid].tasks.length - 1].id + 1);
        taskDelete(element);
    } else { 
        const element = taskTab(title, due, priority, description, projectsList.projects[pid].tasks.length);
        taskDelete(element);
    }
    projectsList.projects[pid].addTask(title, due, priority, description);
    localStorage.setItem('list', JSON.stringify(projectsList.projects));
};

function deleteTask(e) {
    const pid = projectsList.findProject(currentProject);
    projectsList.projects[pid].removeTask(e.srcElement.dataset.idt);
    domClear('task',e.srcElement.dataset.idt);
    localStorage.setItem('list', JSON.stringify(projectsList.projects));
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
    localStorage.setItem('list',JSON.stringify(projectsList.projects));
};

export { deleteTask };