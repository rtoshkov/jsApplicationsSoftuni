import {html, render, displayTemplates, writeBook, onEdit, onDelete, submitEdit} from './utils.js';

const row = (bookInfo) => html`
    <tr _id="${bookInfo._id}">
        <td>${bookInfo.title}</td>
        <td>${bookInfo.author}</td>
        <td>
            <button @click="${onEdit}">Edit</button>
            <button @click="${onDelete}">Delete</button>
        </td>
    </tr>`

export const table = (books) => html`
    <button @click=${() => displayTemplates()} id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        ${
                books.map((book) => html`${row(book)}`)
        }
        </tbody>
    </table>`

export const createForm = () => html`
    <form @submit=${writeBook} id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>`


export const editForm = (book) => html`
    <form @submit=${submitEdit} id="edit-form">
        <input type="hidden" name="id" .value="${book._id}">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." .value="${book.title}">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." .value="${book.author}">
        <input type="submit" value="Save">
    </form>`

const availableForms = {
    editForm: editForm,
    createForm: createForm,
}

export const container = (books, choice, book) => html`
    <section id="first">${
            table(books)
    }
    </section>
    <section id="second">${availableForms[choice](book)}</section>`