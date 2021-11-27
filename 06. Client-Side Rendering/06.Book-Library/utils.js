import {html, render} from './node_modules/lit-html/lit-html.js';
import * as templates from './templates.js';
import {getAllRecords, createBook, deleteBook, getBook, editBook} from "./api.js";

const body = document.body;

export {
    html,
    render,
    getAllRecords,
}

export function displayTemplates(selectedForm = 'createForm', book= undefined) {

    render(templates.container( selectedForm, book), body);
}

function isThereEmptyFileds(data){
    if (Object.values(data).some(record => record === '')) {
        alert('Empty Fields not allowed');
        throw new Error ('Empty Fields not allowed');
    }
}

export async function writeBook(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        title: formData.get('title').trim(),
        author: formData.get('author').trim(),
    }

    isThereEmptyFileds(data);

    await createBook(data);
    e.target.reset();
    displayTemplates();
}


export async function onEdit(e) {
    const tr = e.target.parentElement.parentElement
    const id = tr.getAttribute('_id');
    const book = await getBook(id);
    book._id = id;
    displayTemplates('editForm', book);

}

export async function onDelete(e) {
    const tr = e.target.parentElement.parentElement
    const id = tr.getAttribute('_id');
    await deleteBook(id);
    displayTemplates();
}

export async function submitEdit(e){
    e.preventDefault();
    const form = e.target
    const formData = new FormData(form);
    const id = formData.get('id').trim()
    const data = {
        title: formData.get('title').trim(),
        author: formData.get('author').trim(),
    }
    isThereEmptyFileds(data);
    console.log(data);
    await editBook(id, data)
    displayTemplates();
}