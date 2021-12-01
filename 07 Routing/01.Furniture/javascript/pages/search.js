import {html} from '../libs.js';
import {SearchModel} from '../../new/data.js'

const searchTemplate = (onSearch, result = []) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Search Catalog</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSearch}>
        <div class="col-md-4">
            <input class="form-control" id="search" type="text" name="search">
        </div>
        <div class="col-md-4 test">
        <input type="submit" class="btn btn-primary" value="Search" />
        </div>
        <div>
        ${result ? result.map(furnitureCard) : null}
        </div>
    </div>`


const furnitureCard = (item) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${item.img}" alt="test"" />
                <p>${item.description}</p>
                <footer>
                    <p>Price: <span>${item.price} $</span></p>
                </footer>
                <div>
                    <a href=${`/details/${item._id}`} class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>`


export async function displaySearch(ctx){
    ctx.render(searchTemplate(onSearch));

    let  result = await SearchModel("table");

    async function onSearch(e){
        console.log('cliked')
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchWord = formData.get('search').trim();
        result = await SearchModel(searchWord);
        console.log(result.map( (item) => furnitureCard(item)))
        ctx.render(searchTemplate(onSearch, result));
    }

}


