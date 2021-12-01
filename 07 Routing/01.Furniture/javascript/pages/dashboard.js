import {html, until} from '../libs.js';
import {NumberOfPages, paginationFurniture} from "../../new/data.js";

const dashTemplate = (furniturePromise, pageCount, currentPage) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div>
        ${currentPage > 1 
                ?
                    html`<a href="/index?page=${currentPage - 1}">previous</a>` 
                :   null 
        }
        |
        ${currentPage < pageCount 
                ? html`<a href="/index?page=${currentPage +1}">next</a>` 
                : null 
        }
    </div>
    <div class="row space-top">
        ${until(furniturePromise, html`<p>Loading ....</p>`)}
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


export async function displayDashboard(ctx) {

    const query = ctx.querystring
    let currentPage = 1;
    if(query){
        const temp = query.split('=')[1].trim();
        currentPage = convertToIntegerOrReturn1(temp);
    }
    const pageCount = Number(await NumberOfPages());

    ctx.render(dashTemplate(furniturePromise(currentPage),pageCount,currentPage))

    async function furniturePromise(page) {
        const furniture = await paginationFurniture(page);
        return furniture.map((item) => furnitureCard(item))
    }
}

function convertToIntegerOrReturn1(str){
    const number = Number(str);
    if (Number.isInteger(number)){
        return number
    } else{
        return false;
    }
}