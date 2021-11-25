import * as ctx from '../context.js'
import * as api from "../api.js";
export const dashboardSection = document.getElementById('dashboard-holder');
dashboardSection.remove();
dashboardSection.addEventListener('click', onClick)

export function showDashboard(){
    populateDashboard();
    ctx.main.replaceChildren(dashboardSection);
}


async function populateDashboard() {
    const cards = await api.getAllIdeas();
    if (cards.length > 0) {
        dashboardSection.innerHTML = '';
        cards.forEach((e) => createCard(e));
    }else{
        dashboardSection.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>';
    }
}




function createCard(card) {
    dashboardSection.innerHTML += `
<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${card.title}</p>
    </div>
    <img class="card-image" src="${card.img}" alt="Card image cap">
    <a class="btn" id ="${card._id}" href="">Details</a>
</div>
`}


function onClick(e){
    if(e.target.tagName === 'A'){
        const id = e.target.getAttribute('id');
        if (id !== undefined){
            e.preventDefault();
            ctx.showSection('details', id);
        }
    }
}