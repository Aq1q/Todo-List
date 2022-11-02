function deleteElement (e, id) {   
    if (e === 'project') {
        console.log(id);
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
    child.setAttribute("data-idp", id);
    
    const name = document.createElement('span');
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
    return button;
}

function modal() {
    let modal = document.getElementById('modal');
    
    let btn = document.getElementById('taskBtn');

    let span = document.getElementsByClassName('close')[0];

    let submit = document.getElementById('taskAdd');

    btn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    span.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    submit.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', e => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
};

function taskTab(elements, id) {
    const parent =  document.getElementById('tlist');
    const child = document.createElement('li');
    const grandChild = document.createElement('div');

    child.setAttribute('data-idt', id);
    child.classList.add('taskbox');

    grandChild.classList.add('options');
    
    const title = document.createElement('span');
    title.classList.add('task');
    title.innerText = `Title: ${elements[0].value}`;
    grandChild.appendChild(title);

    const dueDate = document.createElement('span');
    dueDate.classList.add('task');
    dueDate.innerText = `Due: ${elements[1].value}`;
    grandChild.appendChild(dueDate)

    const priority = document.createElement('span');
    priority.classList.add('task');
    priority.innerText = `Priority: ${elements[2].value}`;
    grandChild.appendChild(priority);

    const description = document.createElement('p');
    description.classList.add('taskd');
    description.innerText = elements[3].value;
    grandChild.appendChild(description);

    child.appendChild(grandChild);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerText = 'Delete';
    deleteBtn.setAttribute('data-idt', id);
    child.appendChild(deleteBtn);

    parent.appendChild(child);
    
    return deleteBtn;
}

export { deleteElement, addProject, taskTab, modal };