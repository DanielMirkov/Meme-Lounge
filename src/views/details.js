import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteRecord, getMemeById } from '../api/data.js';

const detailsTemplate = (item, onDelete, userId) => html `
<section id="meme-details">
    <h1>Meme Title: ${item.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${item.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${item.description}</p>
            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${item._ownerId === userId ? html`
            <a class="button warning" href="/edit/${item._id}">Edit</a>
            <button @click=${onDelete} class="button danger" text="Delete">Delete</button>
            ` : ''}
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {

    const item = await getMemeById(ctx.params.id);
    const userId = sessionStorage.getItem('userId');
   
    // const userId = sessionStorage.getItem('userId');
    ctx.render(detailsTemplate(item, onDelete, userId));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this item?');
        if (confirmed) {
            await deleteRecord(item._id);
            //alert('Item deleted!');
            ctx.page.redirect('/home');

        }
        
        // return;
    }

}