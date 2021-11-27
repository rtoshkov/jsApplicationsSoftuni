import {html, render} from './node_modules/lit-html/lit-html.js';

const root = document.getElementById('root')
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

const ListTemplate = (items) => html`${items.map((e) => html`<li>${e}</li>`)}`
// render(ListTemplate(),root);


function onSubmit(e){
    e.preventDefault();
    const userInput = document.getElementById('towns').value;
    const towns = userInput.split(',').map(e => e.trim());
    towns[0] !== '' && render(ListTemplate(towns),root);
}