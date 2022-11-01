import { projectsList } from "./logic";
import { deleteElement as domClear} from "./DOM" ;
import { addProject as domProject} from "./Dom";

const deleteP = document.querySelectorAll('.ximg');
deleteP.forEach(button => button.addEventListener('click', event => deleteProject(event)));

function allowDelete (btn) {
    btn.addEventListener('click', event => deleteProject(event));
}

function deleteProject(e) {
    console.log(e.srcElement.dataset.id);
    console.log(projectsList.projects[e.srcElement.dataset.id]);
    projectsList.removeProject(e.srcElement.dataset.id);
    console.log(projectsList.projects);
    domClear(e.srcElement.dataset.id);
}

const addBtn = document.getElementById('projectform');
addBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    newProject(e);
})

function newProject(e) {
    projectsList.addProject(e.target.elements[0].value);
    console.log(projectsList.projects);
    const btn = domProject(e.target.elements[0].value, projectsList.projects.length-1);
    allowDelete(btn);
}