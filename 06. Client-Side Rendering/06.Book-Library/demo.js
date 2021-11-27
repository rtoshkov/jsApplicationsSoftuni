import {html, render} from './node_modules/lit-html/lit-html.js';
import {until} from './node_modules/lit-html/directives/until.js'
import * as templates from './templates.js';

import {getBook} from "./api.js";


const body = document.body;
const template = (book) => until(PromisedBook(), html`<p>Loading</p>`);

async function PromisedBook(){
    const book = await getBook('d953e5fb-a585-4d6b-92d3-ee90697398a0');
    return html`<p>Resolved ${book.title}</p>`
}
export async function display(){
    const book = await getBook('d953e5fb-a585-4d6b-92d3-ee90697398a0');
    console.log(book);
    render(template(book), body)
}
