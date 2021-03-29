import { html, render } from '../../node_modules/lit-html/lit-html.js';

const notificationTemplate = (message) => html `
<div @click=${clear} id="errorBox" class="notification">
    <span>${message}</span>
</div>
`;

const container = document.getElementById('notifications');

export function notify(message) {
    render(notificationTemplate(message), container)
    setTimeout(clear, 3000);
}

export function clear() {
    render('', container)
}