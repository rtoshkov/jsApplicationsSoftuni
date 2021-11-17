const btnAllBooks = document.getElementById('loadBooks');
btnAllBooks.addEventListener('click', onLoadBooks);
const table = document.querySelector('tbody');
const oldForm = document.querySelector('form');
oldForm.addEventListener('submit', createBook);
const body = document.querySelector('body');
const btnSubmit = document.querySelector('form button');


// onLoadBooks();

async function getBooks(){
    try {
        const request = await fetch('http://localhost:3030/jsonstore/collections/books');
        if (request.status !== 200) {
            throw new Error('Problem fetching data');
        }
        return await request.json();

    }catch (err){
        alert(err.message);
    }
}


async function getBookInfo(id){
    const request = await fetch('http://localhost:3030/jsonstore/collections/books/' + id);
    if (request.status !== 200) {
        throw new Error('Problem fetching data');
    }
    return await request.json();
}

async function onLoadBooks(){
    const books = await getBooks();
    table.textContent = '';
    Object.entries(books).forEach(([key,value]) => createRow(key,value));
}


function createRow(id, el){
    const elementTR = document.createElement('TR');
    elementTR.setAttribute('id', id);
    const elementTD1 = document.createElement('TD');
    elementTD1.textContent = el.title;
    const elementTD2 = document.createElement('TD');
    elementTD2.textContent = el.author;
    const elementTD3 = document.createElement('TD');
    const elementButtonEdit = document.createElement('BUTTON');
    elementButtonEdit.textContent = 'Edit';
    elementButtonEdit.addEventListener('click', showEdit);
    const elementButtonDelete = document.createElement('BUTTON');
    elementButtonDelete.textContent = 'Delete';
    elementButtonDelete.addEventListener('click', onDelete);
    table.appendChild(elementTR);
    elementTR.appendChild(elementTD1);
    elementTR.appendChild(elementTD2);
    elementTD3.appendChild(elementButtonEdit);
    elementTD3.appendChild(elementButtonDelete);
    elementTR.appendChild(elementTD3);
}

async function onDelete(e){
    const id = e.target.parentElement.parentElement.getAttribute('id');
    const request = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'delete'
    })
    e.target.parentElement.parentElement.remove();
}


async function showEdit(k){
    const id = k.target.parentElement.parentElement.getAttribute('id');
    const obj = await getBookInfo(id);


    oldForm.id = 'oldForm';
    oldForm.style.display = 'none';
    const editForm = document.createElement('FORM');
    editForm.id = 'editForm';
    const elementH3 = document.createElement('H3');
    elementH3.textContent = 'Edit Form'
    const elementLabel1 = document.createElement('LABEL');
    elementLabel1.textContent = 'TITLE';
    const elementInputTitle = document.createElement('INPUT');
    elementInputTitle.value = obj.title;
    elementInputTitle.setAttribute('type', 'text');
    elementInputTitle.setAttribute('name', 'title');
    elementInputTitle.setAttribute('placeholder', 'Title...');

    const elementLabel2 = document.createElement('LABEL');
    elementLabel2.textContent = 'AUTHOR';
    const elementInputAuthor = document.createElement('INPUT');
    elementInputAuthor.value = obj.author;
    elementInputAuthor.setAttribute('type', 'text');
    elementInputAuthor.setAttribute('name', 'author');
    elementInputAuthor.setAttribute('placeholder', 'Author...');

    const btnEdit = document.createElement('BUTTON');
    btnEdit.textContent = 'Save';
    btnEdit.addEventListener('click', editBook);

    editForm.appendChild(elementH3);
    editForm.appendChild(elementLabel1);
    editForm.appendChild(elementInputTitle);
    editForm.appendChild(elementLabel2);
    editForm.appendChild(elementInputAuthor);
    editForm.appendChild(btnEdit);

    body.appendChild(editForm);

    async function editBook(s){
        s.preventDefault();
        const data = {
            title: elementInputTitle.value.trim(),
            author: elementInputAuthor.value.trim(),
        }

        try{
            if(Object.values(data).some((e) => e === '')){
                throw new Error('You can NOT have empty fields')
            }

            const request = await fetch('http://localhost:3030/jsonstore/collections/books/' + id,{
                method: 'PUT',
                'Content-Type': 'application/json',
                body: JSON.stringify(data)
            });
            if(request.ok !== true){
                throw new Error('failing updating info')
            }
            editForm.remove();
            oldForm.style.display = 'block';
        }catch(err){
            alert(err.message);
        }
    }

}

async function createBook(e){
    e.preventDefault();
    const formData = new FormData(oldForm);
    const data = {
        title: formData.get('title').trim(),
        author: formData.get('author').trim()
    }

    try{
        if(Object.values(data).some((e) => e === '')){
            throw new Error('You can NOT have empty fields')
        }

        const request = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'post',
            'Content-Type': 'application/json',
            body: JSON.stringify(data)
        })

        if(request.ok === false){
            throw new Error('Unable to update')
        }

        oldForm.reset();

    }catch(err){
        alert(err.message);
    }

}