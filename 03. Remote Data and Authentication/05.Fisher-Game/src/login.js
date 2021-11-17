const loginForm = document.querySelector('main section form');
loginForm.addEventListener('submit', onLogin);
const guestOptions = document.getElementById('guest');
const loggedOptions = document.getElementById('user')
const btnLogout = document.getElementById('logout');
btnLogout.addEventListener('click', onLogout);

if (window.localStorage.getItem('mySite') === null) {

    loggedOptions.style.display = 'none';
} else {
    guestOptions.style.display = 'none';
}


function onLogin(f) {
    f.preventDefault();
    const formData = new FormData(loginForm);
    const data = {
        'email': formData.get('email').trim(),
        'password': formData.get('password').trim()
    }

    sentLoginCredentials(data);
}


async function sentLoginCredentials(infoObj) {
    try {

        if (Object.values(infoObj).some((e) => e === '')) {
            throw new Error('Empty fields not allowed');
        }

        const request = await fetch('http://localhost:3030/users/login', {
            'method': 'post',
            'Content-Type': 'application/json',
            'body': JSON.stringify(infoObj)
        })

        if (request.status !== 200) {
            const error = await request.json();
            throw new Error(error.message);
        }

        const data = await request.json();
        window.localStorage.setItem('mySite', JSON.stringify({accessToken: data.accessToken, id: data._id}));
        window.location = 'index.html';
    } catch (errors) {
        alert(errors.message);
    }

}

function onLogout() {
    window.localStorage.removeItem('mySite');
}