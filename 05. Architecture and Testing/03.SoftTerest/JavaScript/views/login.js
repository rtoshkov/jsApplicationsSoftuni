import * as ctx from "../context.js";
import * as api from "../api.js";

export const loginSection = document.getElementById('login');
const form = loginSection.querySelector('form');
form.addEventListener('submit', onLogin);
loginSection.remove();

export function showLogin() {
    ctx.main.replaceChildren(loginSection);
}

async function onLogin(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    await api.login(email, password);
    ctx.showSection('dashboard');
}