import * as ctx from '../context.js'
import * as api from "../api.js";

export const detailsSection = document.getElementById('details');
detailsSection.remove();




export function showDetails(id){
    populateDetails(id);
    ctx.main.replaceChildren(detailsSection);

}


async function populateDetails(id){
    const data = await api.getCardDetails(id);
    detailsSection.innerHTML=`
<img class="det-img" src="${data.img}" />
<div class="desc">
    <h2 class="display-5">${data.title}</h2>
    <p class="infoType">Description:</p>
    <p class="idea-description">${data.description}</p>
</div>
<div class="text-center">
    <a class="btn detb deleteBTN" owner_id="${data._ownerId}" id="${data._id}" style="display: none" href="">Delete</a>
</div>`

    enableDelForOwner();
}

function enableDelForOwner(){
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const deleteBTN = detailsSection.querySelector('A');
    const detailsOwner = deleteBTN.getAttribute('owner_id');
    if (user !== null && user.id === detailsOwner){
        deleteBTN.style.display = 'inline-block';
    }else{
        deleteBTN.remove();
    }

    deleteBTN.addEventListener('click', onDelete);
}

async function onDelete(e){
    e.preventDefault();
    const detailsID = e.target.getAttribute('id');
    await api.sendDelete(detailsID);
    ctx.showSection('dashboard');

}