import {html, render} from './node_modules/lit-html/lit-html.js';
import {towns} from './towns.js';
const objectTowns = towns.map((e) => {
    return {text: e, match: false}
})

const button = document.querySelector('BUTTON');
button.addEventListener('click', onClick);

const templateDivTowns = (objectTowns) => html`<ul> ${objectTowns.map(town => html`<li class="${town.match ? 'active' : '' }">${town.text}</li>`)} </ul>`

const townsDiv = document.getElementById('towns');
render(templateDivTowns(objectTowns),townsDiv);


function onClick(){
    const userInput = document.getElementById('searchText').value.trim().toLocaleLowerCase();
    if (userInput === ''){
        return;
    }
    objectTowns.forEach((town) => town.text.toLocaleLowerCase().includes(userInput) ? town.match = true : town.match = false)
    render(templateDivTowns(objectTowns),townsDiv);
}