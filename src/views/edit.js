import { html } from '../../node_modules/lit-html/lit-html.js';
import { editMeme, getMemeById } from '../api/data.js';
import { notify } from './notification.js';

const editTemplate = (item, onSubmit) => html `
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder=${item.title} name="title" value=${item.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                       ${item.description}
                        </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" value=${item.imageUrl} name="imageUrl">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;

    const item = await getMemeById(id);

    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(event) {

        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();
        if (title == '' || description == '' || imageUrl == '') return notify('All fields are required!');
        const data = {
            title,
            description,
            imageUrl
        }

        await editMeme(item._id, data);

        ctx.page.redirect('/home');
    }
}