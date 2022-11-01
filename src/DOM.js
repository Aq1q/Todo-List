function deleteElement (id) {   
    const element = document.querySelector(`[data-id="${id}"]`);
    element.remove();
}

function addProject (title, id) {
    const parent = document.getElementById('plist');
    const child = document.createElement('li');
    child.classList.add('projectbox');
    child.setAttribute("data-id", id);
    
    const name = document.createElement('span');
    name.innerText = title;
    child.appendChild(name);

    const button = document.createElement('button');
    const img = document.createElement('img');
    img.classList.add('ximg');
    img.setAttribute('alt', 'delete');
    img.setAttribute('src', './images/X.svg');
    img.setAttribute('data-id',id);

    button.appendChild(img);
    child.appendChild(button);
    parent.appendChild(child);
    return button;
}

export { deleteElement, addProject };