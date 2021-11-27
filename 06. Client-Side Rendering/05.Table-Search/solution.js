import {html , render} from './node_modules/lit-html/lit-html.js';

const tbody = document.querySelector('TBODY');
const button = document.getElementById('searchBtn');
button.addEventListener('click', onSearch);
const searchFiled = document.getElementById('searchField');

startUP();

async function startUP(userInput = undefined){
    const users = Object.values(await getPeople());
    const persons = users.map(user => ({content: user, match:false}));
    if (userInput !== undefined){
        searchTable(persons, userInput);
    }
    render(template(persons), tbody);
}


const trTemplate = (person) => html`
    <tr id="${person.content._id}" class="${person.match ? 'select' : ''}">
        <td>${person.content.firstName} ${person.content.lastName}</td>
        <td>${person.content.email}</td>
        <td>${person.content.course}</td>
    </tr>`

const template =  (persons) => html`${persons.map(person => trTemplate(person))}`;


async function getPeople() {
    const request = await fetch('http://localhost:3030/jsonstore/advanced/table');
    if(request.ok === false){
        const err = await request.json();
        throw new Error(err.message)
    }
    return request.json()
}


async function onSearch(){
    const userInput = searchFiled.value.trim().toLocaleLowerCase();
    if (userInput === ''){
        return;
    }
    startUP(userInput);
}

function searchTable(persons, userInput){
    persons.forEach((person) => {
        const searchable = Object.values(person.content).join(' ').toLocaleLowerCase();
        const isMatch = searchable.includes(userInput);
        isMatch ? person.match = true : person.match = false;
    })
}