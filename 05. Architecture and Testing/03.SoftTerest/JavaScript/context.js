import {showHome} from "./views/home.js";

export const main = document.querySelector('main');
import * as crt from './views/create.js'
import * as dsh from './views/dashboard.js'
import * as dtl from './views/details.js'
import * as hom from './views/home.js'
import * as log from './views/login.js'
import * as reg from './views/register.js'
import * as nav from './views/navBar.js'
import * as api from './api.js';

export const updateNav = nav.updateNav;

const views = {
    'home': hom.showHome,
    'create': crt.showCreate,
    'dashboard': dsh.showDashboard,
    'details': dtl.showDetails,
    'login': log.showLogin,
    'register': reg.showRegister,
    'logout': logout
}

export function showSection(section, ...params){
    updateNav();
    if (typeof views[section] === 'function'){
        views[section](...params);
    }
}


function logout(){
    window.localStorage.removeItem('userInfo');
    showSection('dashboard');
}