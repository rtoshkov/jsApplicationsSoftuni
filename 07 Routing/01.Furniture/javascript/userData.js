

function getUserData () {
    return JSON.parse(window.localStorage.getItem('userData'));
}

function saveUserData (data) {
    window.localStorage.setItem('userData', JSON.stringify(data));
}

function deleteUserData(){
    window.localStorage.removeItem('userData');
}


export {
    getUserData,
    saveUserData,
    deleteUserData,
}