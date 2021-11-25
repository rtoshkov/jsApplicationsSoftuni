import * as ctx from "../context.js";
import * as api from "../api.js";


export const createSection = document.getElementById('create');
createSection.remove();
const form = createSection.querySelector('form');
form.addEventListener('submit', onSubmit);

export function showCreate(){
    ctx.main.replaceChildren(createSection);
}


async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageURL').trim();
    await api.create({title,description,img});
    ctx.showSection('dashboard');
}