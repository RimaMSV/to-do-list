'use strict';

const inputEl = document.querySelector('.to-do');
const listEl = document.querySelector('.list');
const removeBtnEl = document.querySelector('.remove-icon');
const editeIconEl = document.querySelector('.edit-icon');
let allToDos = [];

let tempTodos = localStorage.getItem('localTodos');

if (tempTodos !== '' || tempTodos) {
  allToDos = JSON.parse(tempTodos);
  renderTodos();
}

function writeTodos() {
  localStorage.setItem('localTodos', JSON.stringify(allToDos));
}

function addItem(e) {
  let itemText = inputEl.value;

  if (e.key == 'Enter' && itemText != '') {
    // console.log(itemText);
    let todoList = JSON.parse(localStorage.getItem(allToDos));

    let toDo = {
      text: itemText,
      id: new Date().getTime(),
      checked: false,
    };

    allToDos.push(toDo);

    console.log(allToDos); //Test
    listEl.innerHTML = '';

    writeTodos();
    renderTodos();
  }
}

function renderTodos() {
  let newTask = allToDos.map((item) => {
    let newItemDiv = document.createElement('div');
    let newCheckbox = document.createElement('input');
    let newItem = document.createElement('li');
    let newTextInp = document.createElement('input');
    newTextInp.value = item.text;
    let newIconsDiv = document.createElement('div');
    let newEditIcon = document.createElement('ion-icon');
    let newRemoveIcon = document.createElement('ion-icon');

    // newRemoveIcon.addEventListener('click', () => {});

    newCheckbox.setAttribute('type', 'checkbox');
    if (item.checked) {
      newCheckbox.setAttribute('checked', item.checked);
    }

    newCheckbox.addEventListener('change', () => {
      newTextInp.classList.toggle('done');
      item.checked = !item.checked;
    });
    newCheckbox.setAttribute('id', item.id);
    newCheckbox.setAttribute('name', 'checkbox');
    newTextInp.setAttribute('type', 'text');
    newEditIcon.setAttribute('name', 'pencil');
    newEditIcon.addEventListener('click', () => {
      newTextInp.disabled = false;
      newTextInp.style.backgroundColor = '#fff';
      newTextInp.focus();

      writeTodos();
    });
    newTextInp.setAttribute('disabled', true);
    newTextInp.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        newTextInp.style.backgroundColor = '#ECEAEA';
        newTextInp.disabled = true;

        toDo.text = newTextInp.value;
        console.log(allToDos);

        writeTodos();
      }
    });
    newRemoveIcon.setAttribute('name', 'close');

    newItemDiv.classList.add('item-div');
    newItem.classList.add('item');
    newTextInp.classList.add('item-text');
    newIconsDiv.classList.add('icons');
    newEditIcon.classList.add('edit-icon');
    newRemoveIcon.classList.add('remove-icon');

    listEl.appendChild(newItemDiv);
    newItemDiv.appendChild(newItem);
    newItemDiv.appendChild(newCheckbox);
    newItem.appendChild(newIconsDiv);
    newItem.appendChild(newTextInp);
    newIconsDiv.appendChild(newRemoveIcon);
    newIconsDiv.appendChild(newEditIcon);
    // console.log(newItem);//Test

    inputEl.value = '';
    return task;
  });
  console.log(newTask);
}

function removeItem(e) {
  // console.log(e.target);//Tsest
  if (e.target.classList.contains('remove-icon')) {
    e.target.parentElement.parentElement.parentElement.remove();
  }
}

inputEl.addEventListener('keyup', addItem);
listEl.addEventListener('click', removeItem);
