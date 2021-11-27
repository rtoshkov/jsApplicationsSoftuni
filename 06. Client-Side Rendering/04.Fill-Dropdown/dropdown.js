import {html, render} from './node_modules/lit-html/lit-html.js';
import {until} from './node_modules/lit-html/directives/until.js';

const menu = document.getElementById('menu');
const form = document.querySelector('FORM');
form.addEventListener('submit', onSubmit);


const template = (listItems) => html`${listItems.map(item => templateItem(item))}`
const templateItem = (item) => html`<option .value="${item._id}">${item.text}</option>>`

loadPage();


async function onSubmit(e){
    e.preventDefault();
    const userInput = document.getElementById('itemText').value.trim();
    await updateList(userInput);
    loadPage();
}

async function loadPage(){
    const result = await getList();
    render(template(Object.values(result)),menu);
}



async function getList(){
    const request = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    if(request.ok === false){
        const error = await request.json();
        throw new Error(error.message);
    }
    return request.json();
}


async function updateList(data){
    const request = await fetch('http://localhost:3030/jsonstore/advanced/dropdown',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: data})
    });
}

