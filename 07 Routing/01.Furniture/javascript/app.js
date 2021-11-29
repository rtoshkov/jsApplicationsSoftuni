import * as libs from "./libs.js"
import {displayDashboard} from "./pages/dashboard.js";
import {displayLogin} from "./pages/login.js";
import {displayCreate} from "./pages/create.js";
import {displayRegister} from "./pages/register.js";
import {displayMyFurniture} from "./pages/myFurniture.js";
import {displayDetails} from "./pages/details.js";
import {displayEdit} from "./pages/edit.js";
import * as api from "./api.js";
import {deleteItem} from "./api.js";
import {getUserData} from "./userData.js";


const main = document.querySelector('div.container');
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', onLogout);

libs.page(extendPage);
libs.page('/index', displayDashboard);
libs.page('/login', displayLogin);
libs.page('/create', displayCreate);
libs.page('/delete/:id', onDelete)
libs.page('/register', displayRegister);
libs.page('/MyFurniture', displayMyFurniture);
libs.page('/details/:id', displayDetails);
libs.page('/edit/:id', displayEdit);
libs.page('/', '/index');

libs.page.start();
updateNav();

function extendPage(ctx, next) {
    ctx.render = (template) => libs.render(template, main);
    ctx.updateNav = updateNav;
    next();
}


async function onLogout() {
    await api.logout();
    updateNav();
    libs.page.redirect('/')
}

async function onDelete(ctx) {
    const itemID = ctx.params.id;
    await deleteItem(itemID);
    ctx.page.redirect('/');
}

function updateNav(){
    const userData = getUserData();
    if(userData){
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline-block';
    }else{
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
}