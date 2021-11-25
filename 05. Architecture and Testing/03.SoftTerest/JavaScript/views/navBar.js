import * as ctx from "../context.js"

export const navBar = document.getElementById('navBar')
const imgLink = document.getElementById('imgLink');
const dashBoardLink = document.getElementById('dashBoardLink');
const createLink = document.getElementById('createLink');
const logoutLink = document.getElementById('logoutLink');
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');



const navLinks = {
    'imgLink' : 'home',
    'dashBoardLink' : 'dashboard',
    'createLink' : 'create',
    'logoutLink' : 'logout',
    'loginLink' : 'login',
    'registerLink': 'register'
}

navBar.addEventListener('click', onClick);


function onClick(e){
    e.preventDefault();
    let target = e.target;
    if(target.tagName === 'IMG'){
        target = e.target.parentElement;
    }
    goToView(target);
}

function goToView(target){
    if(target.tagName === 'A'){
        const destination = navLinks[target.getAttribute('id')];
        if(destination !== undefined){
            ctx.showSection(destination);
        }
    }
}

export function updateNav(){
    const userInfo = window.localStorage.getItem('userInfo');
    if(userInfo !== null){
        loginLink.parentElement.style.display = 'none';
        registerLink.parentElement.style.display = 'none';

        createLink.parentElement.style.display = 'list-item';
        logoutLink.parentElement.style.display = 'list-item';
    }else{
        loginLink.parentElement.style.display = 'list-item';
        registerLink.parentElement.style.display = 'list-item';

        createLink.parentElement.style.display = 'none';
        logoutLink.parentElement.style.display = 'none';
    }
}