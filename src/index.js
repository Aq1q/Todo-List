import { projectsList } from "./logic";
import { deleteElement as domClear} from "./DOM" ;
import { addProject as domProject} from "./Dom";

function allowDelete (btn) {
    btn.addEventListener('click', event => deleteProject(event));
}

function deleteProject(e) {
    projectsList.removeProject(e.srcElement.dataset.id);
    domClear(e.srcElement.dataset.id);
}

const addBtn = document.getElementById('projectform');
addBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    newProject(e.target.elements[0].value);
})

function newProject(name) {
    projectsList.addProject(name);
    const btn = domProject(name, projectsList.projects.length-1);
    allowDelete(btn);
}

newProject('Main');