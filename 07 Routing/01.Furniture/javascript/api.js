import {getUserData, saveUserData, deleteUserData} from './userData.js';
import {page} from './libs.js';

export async function login(email, password) {
    const request = await fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    try {
        if (request.ok === false) {
            const serverErr = await request.json();
            throw new Error(serverErr.message);
        }

        const data = await request.json();
        saveUserData(data);


    } catch (error) {
        throw new Error(error.message);
    }
}

export async function logout() {
    const accessToken = getUserData().accessToken;

    const request = await fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken,
        }
    })

    try {
        if (request.ok === false) {
            const serverErr = await request.json();
            throw new Error(serverErr.message);
        }

        deleteUserData();


    } catch (error) {
        throw new Error(error.message);
    }
}

export async function register(email, password) {
    const request = await fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    try {
        if (request.ok === false) {
            const serverErr = await request.json();
            throw new Error(serverErr.message);
        }

        const data = await request.json();
        saveUserData(data);


    } catch (error) {
        throw new Error(error.message);
    }
}

export async function allFurniture() {
    const request = await fetch('http://localhost:3030/data/catalog');
    return request.json();
}

export async function furnitureByID(id) {
    const request = await fetch('http://localhost:3030/data/catalog/' + id);
    return request.json();

}

export async function myFurniture() {
    const userId = getUserData()._id;
    const request = await fetch(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`);
    return request.json();
}


export async function editFurniture(item, id) {
    const accessToken = getUserData().accessToken;
    const request = await fetch('http://localhost:3030/data/catalog/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken,
        },
        body: JSON.stringify(item)
    })

    return request.json();
}

export async function deleteItem(id){
    const accessToken = getUserData().accessToken;
    const request = await fetch('http://localhost:3030/data/catalog/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken
        }
    });
    return request.json();
}

export async function createFurniture(data){
    const accessToken = getUserData().accessToken;
    const request = await fetch('http://localhost:3030/data/catalog', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'X-Authorization': accessToken
        },
        body: JSON.stringify(data),
    })
    try {
        if (request.ok === false) {
            const serverErr = await request.json();
            throw new Error(serverErr.message);
        }



    } catch (error) {
        throw new Error(error.message);
    }

}