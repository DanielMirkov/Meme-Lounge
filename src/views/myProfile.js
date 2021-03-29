import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllOfMyMemes } from '../api/data.js';
import { itemTemplate } from './common/item.js';

const myTemplate = (data, username, email, gender) => html `
<section id="user-profile-page" class="user-profile ">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${gender}.png">
        <div class="user-content">
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <p>My memes count: ${data.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        <!-- Display : All created memes by this user (If any) -->
        ${data.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : Object.values(data).map(itemTemplate)}

        <!-- Display : If user doesn't have own memes  -->
    </div>
</section>
`;

export async function myPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');
    const gender = sessionStorage.getItem('gender');
   
    const data = await getAllOfMyMemes(userId);
   
    ctx.render(myTemplate(data, username, email, gender));
}