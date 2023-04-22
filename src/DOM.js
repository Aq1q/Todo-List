import { deleteTask } from "./index";

function deleteElement (e, id) {   
    if (e === 'project') {
        const element = document.querySelector(`[data-idp="${id}"]`);
        element.remove();
    } else {
        const element = document.querySelector(`[data-idt="${id}"]`);
        element.remove();
    }
}

function addProject (title, id) {
    const parent = document.getElementById('plist');
    const child = document.createElement('li');
    child.classList.add('projectbox');
    child.setAttribute('data-idp', id);
    
    const name = document.createElement('span');
    name.setAttribute('data-idp', id);
    name.innerText = title;
    child.appendChild(name);

    const button = document.createElement('button');
    const img = document.createElement('img');
    img.classList.add('ximg');
    img.setAttribute('alt', 'delete');
    img.setAttribute('src', './images/X.svg');
    img.setAttribute('data-idp', id);

    button.appendChild(img);
    child.appendChild(button);
    parent.appendChild(child);


    const elements = [button, child];
    
    return elements;
}

function modal() {
    let modal = document.getElementById('modal');
    
    let btn = document.getElementById('taskBtn');

    let span = document.getElementsByClassName('close')[0];

    btn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    span.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', e => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
};

function hideModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'
}

function taskTab(t, d, p, desc, id) {
    const parent =  document.getElementById('tlist');
    const child = document.createElement('li');
    const grandChild = document.createElement('div');

    child.setAttribute('data-idt', id);
    child.classList.add('taskbox');

    grandChild.classList.add('options');
    
    const title = document.createElement('span');
    title.classList.add('task');
    title.innerText = `Title: ${t}`;
    grandChild.appendChild(title);

    const dueDate = document.createElement('span');
    dueDate.classList.add('task');
    dueDate.innerText = `Due: ${d}`;
    grandChild.appendChild(dueDate)

    const priority = document.createElement('span');
    priority.classList.add('task');
    priority.innerText = `Priority: ${p}`;
    grandChild.appendChild(priority);

    const description = document.createElement('p');
    description.classList.add('taskd');
    description.innerText = desc;
    grandChild.appendChild(description);

    child.appendChild(grandChild);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerText = 'Delete';
    deleteBtn.setAttribute('data-idt', id);
    child.appendChild(deleteBtn);

    parent.appendChild(child);
    
    return deleteBtn;
};

function loadTasks (from) {
    clearTasks();
    let i = 0;
    while (i < from.tasks.length && from.tasks.length != 0) {
        const element = taskTab(from.tasks[i].title, from.tasks[i].dueDate, from.tasks[i].priority, from.tasks[i].description, from.tasks[i].id);
        element.addEventListener('click', event => deleteTask(event));
        i++;
    }
};

function clearTasks () {
    const list = document.getElementById('tlist');
    list.innerHTML = '';
}

export { deleteElement, addProject, taskTab, modal, loadTasks, clearTasks, hideModal };