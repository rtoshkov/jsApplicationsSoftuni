export async function getAllRecords() {
    const request = await fetch('http://localhost:3030/jsonstore/collections/books');
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }
    return request.json();
}

export async function createBook(data) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const request = await fetch('http://localhost:3030/jsonstore/collections/books', options);
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }
    return
}

export async function deleteBook(id){
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const request = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, options);
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }
    return

}


export async function getBook(id) {
    const request = await fetch('http://localhost:3030/jsonstore/collections/books/' + id);
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }
    return request.json();
}

export async function editBook(id, data){
    console.log(id);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }
    const request = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, options);
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }
    return

}