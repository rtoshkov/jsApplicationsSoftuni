export async function getAllIdeas() {
    const request = await fetch('http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
    return request.json();
}

export async function getCardDetails(id) {
    const request = await fetch('http://localhost:3030/data/ideas/' + id);
    return request.json();
}


export async function login(email, password) {
    try {
        const request = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
        if (request.ok === false) {
            const error = await request.json();
            throw new Error(error.message);
        }

        const data = await request.json();
        const browserData = {
            accessToken: data.accessToken,
            id: data._id,
            email: data.email,
            username: data.username
        }
        window.localStorage.setItem('userInfo', JSON.stringify(browserData));

    } catch (err) {
        alert(err.message);
        throw err;
    }

}

export async function register(email, password) {
    try {
        const request = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
        if (request.ok === false) {
            const error = await request.json();
            throw new Error(error.message);
        }

        const data = await request.json();
        const browserData = {
            accessToken: data.accessToken,
            id: data._id,
            email: data.email,
            username: data.username
        }
        window.localStorage.setItem('userInfo', JSON.stringify(browserData));

    } catch (err) {
        alert(err.message);
        throw err;
    }

}

export async function create(data) {
    try {
        const accessToken = JSON.parse(localStorage.getItem('userInfo')).accessToken;
        const request = await fetch('http://localhost:3030/data/ideas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
            body: JSON.stringify(data)
        })
        if (request.ok === false) {
            const error = await request.json();
            throw new Error(error.message);
        }

        const reward = await request.json();
    } catch (err) {
        alert(err.message);
        throw err;
    }

}

export async function sendDelete(id) {
    const accessToken = JSON.parse(localStorage.getItem('userInfo')).accessToken;
    const request = await fetch('http://localhost:3030/data/ideas/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken,
        }
    })
}