const btnLoad = document.getElementById('btnLoad');
btnLoad.addEventListener('click', loadContacts);
const ulPhonebook = document.getElementById('phonebook');
const inputPerson = document.getElementById('person');
const inputPhone = document.getElementById('phone');
const btnCreate = document.getElementById('btnCreate');
btnCreate.addEventListener('click', sendContact);

 loadContacts();


async function loadContacts() {
    ulPhonebook.textContent = '';
    const request = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await request.json();
    Object.values(data).forEach((e) => createLi(e));
}

async function sendContact() {
    const person = inputPerson.value;
    const phone = inputPhone.value;
    const request = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({person, phone})
    });
    loadContacts();
}

function createLi(object) {
    const liItem = document.createElement('LI');
    liItem.textContent = `${object.person} : ${object.phone}`;
    liItem.setAttribute('id', object._id);
    const createBtn = document.createElement('BUTTON');
    createBtn.textContent = 'Delete';
    createBtn.addEventListener('click', onDelete);
    liItem.appendChild(createBtn);
    ulPhonebook.appendChild(liItem);

}

async function onDelete(e) {
    const elID = e.target.parentElement.getAttribute('id');

    const request = await fetch(`http://localhost:3030/jsonstore/phonebook/${elID}`,{
        method: 'delete'
    });

    e.target.parentElement.remove();

    // console.log(await request.json())

}