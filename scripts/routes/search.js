import { api, html, onkeydown } from '../utils/helpers.js';

export default function(app, term) {
    const { logo, results, search } = app.data;
    search.value = term;

    results.innerHTML = '';

    api('results', logo).then(data => {
        //Render results
        const resultsList = html`
            <ul is="chipi-navlist">
            ${data.map(result => html`<li>${renderResult(result)}</li>`)}
            </ul>`;

        //Escape
        onkeydown(['Escape', 'ArrowLeft'], resultsList, () => app.go('suggestions'));

        resultsList.previousFocusableElement = search;
        results.append(resultsList);
        search.input.focus();
    });

    function renderResult(data) {
        const element = html`
        <article is="chipi-result" class="result is-list" tabindex="0">
            <div class="result-service avatar">
                <img src="img/avatar/${data.from.avatar}.jpg" class="avatar-user">
                <img src="img/logo/${data.channel.type}.svg" class="avatar-service">
            </div>
            <nav class="result-location">
                <ul>
                    ${data.channel.location.map(val => `<li><button>${val}</button></li>`)}
                </ul>
            </nav>
            <h2 class="result-title" title="${data.title}">${data.title}</h2>
            <time class="result-time">${new Date(data.time * 1000).toDateString()}</time>
            <p class="result-description">${data.excerpt}</p>
        </article>`;

        element.addEventListener('click', () => app.go('details', element, data));
        return element;
    }
}
