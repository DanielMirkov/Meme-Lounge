import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMemes } from '../api/data.js';
import { itemTemplate } from './common/item.js';


export async function homePage(ctx) {
    const data = await getMemes();

    ctx.render(homeTemplate(data));
}


const homeTemplate = (data) => html `

<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        <!-- Display : All memes in database ( If any ) -->
        ${data.length== 0 ? html `<p class="no-memes">No memes in database.</p>` :Object.values(data).map(itemTemplate)}
        <!-- Display : If there are no memes in database -->
    </div>
</section>
`;