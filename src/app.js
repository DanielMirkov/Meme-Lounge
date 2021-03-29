import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { homePage } from './views/home.js';
import { logout } from './api/data.js';

import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { myPage } from './views/myProfile.js';
import { editPage } from './views/edit.js';
import { welcomePage } from './views/welcome.js';


const main = document.querySelector('main');

page('/', decorateContext, (sessionStorage.getItem('authToken') == null ? welcomePage : homePage));
page('/index.html', decorateContext, (sessionStorage.getItem('authToken') == null ? welcomePage : homePage));
page('/home', decorateContext, homePage);
page('/myProfile', decorateContext, myPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);

document.querySelector('.logout').addEventListener('click', async() => {

    await logout();
    page.redirect('/');
    setUserNav();
});

setUserNav();
//start app
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}


function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    const userEmail = sessionStorage.getItem('email');

    if (userId != null) {
        document.querySelector('.profile>span').textContent = `Welcome, ${userEmail}`;
        document.querySelectorAll('.user').forEach(u => u.style.display = 'block');
        document.querySelectorAll('.guest').forEach(u => u.style.display = 'none');
    } else {
        document.querySelectorAll('.user').forEach(u => u.style.display = 'none');
        document.querySelectorAll('.guest').forEach(u => u.style.display = 'block');
    }
}
/*
•	Register User (POST): http://localhost:3030/users/register
•	Login User (POST): http://localhost:3030/users/login
•	Logout User (GET): http://localhost:3030/user/logout

•	Create Furniture (POST): http://localhost:3030/data/catalog
•	All Furniture (GET): http://localhost:3030/data/catalog
•	Furniture Details (GET): http://localhost:3030/data/catalog/:id
•	Update Furniture (PUT): http://localhost:3030/data/catalog/:id
•	Delete Furniture (DELETE):  http://localhost:3030/data/catalog/:id
•	My Furniture (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22

*/