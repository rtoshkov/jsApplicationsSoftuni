import {html, render} from './node_modules/lit-html/lit-html.js';
import {cats} from "./catSeeder.js";
cats.forEach(cat => cat.info = true);

const section = document.getElementById('allCats');

const catTemplate = (catCards) => html`<ul>
    ${catCards.map(card => html`
        <li>
            <img src="./images/${card.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${onClick.bind(card)} class="showBtn">${card.info ? `Show status code` : `Hide status code`}</button>
               ${ card.info ? html`
                <div class="status" id="100">
                    <h4>Status Code: ${card.statusCode}</h4>
                    <p>Continue</p>
                </div>`: ''} 
            </div>
        </li>`)}
</ul>>`

function onClick(e){
    this.info = !this.info;
    render(catTemplate(cats), section);
}


render(catTemplate(cats), section);
