import {html} from '../libs.js';
import {furnitureByID} from "../api.js";
import {getUserData} from "../userData.js";

const detailsTemplate = (item, isOwner)=> html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src="${item.img}" />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${item.make}</span></p>
            <p>Model: <span>${item.model}</span></p>
            <p>Year: <span>${item.year}</span></p>
            <p>Description: <span>${item.description}</span></p>
            <p>Price: <span>${item.price}</span></p>
            <p>Material: <span>${item.material}</span></p>
            <div>
                ${isOwner 
                        ? html`
                            <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
                            <a href=${`/delete/${item._id}`} class="btn btn-red">Delete</a>`
                        : null}
                
            </div>
        </div>
    </div>`

export async function displayDetails(ctx){
    const item = await furnitureByID(ctx.params.id);
    const userData = getUserData()
    const isOwner = (userData && userData._id === item._ownerId)
    ctx.render(detailsTemplate(item, isOwner));
}