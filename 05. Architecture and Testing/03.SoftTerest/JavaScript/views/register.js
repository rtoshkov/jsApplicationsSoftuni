import * as ctx from "../context.js";
import * as api from "../api.js";

export const registerSection = document.getElementById('register');
registerSection.remove();
const form = registerSection.querySelector('form');
form.addEventListener('submit', onSubmit);

export function showRegister(){
    ctx.main.replaceChildren(registerSection);
}

async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repPassword = formData.get('repeatPassword').trim();
    if(email=== '' || password === '' || password !== repPassword){
        alert('Всико трябва да е попълнено и паролите да съвпадат');
    }else{
        await api.register(email,password);
        ctx.showSection('dashboard');
    }
}


