import { api, parse } from '../utils/helpers.js';

export default function(app) {
    const { logo, results, search } = app.data;

    results.innerHTML = '';

    api('results', logo).then(data => {
        //Render results
        const html = parse(
            '<ul is="chipi-results">',
            data.map(result => `<li>${renderResult(result)}</li>`).join(''),
            '</ul>'
        );

        //Click result
        html.querySelectorAll('.result').forEach(result =>
            result.addEventListener('click', () => app.go('details', result))
        );

        results.append(html);
        search.input.focus();
    });
}

function renderResult(result) {
    const time = new Date(result.time * 1000);

    return `
    <article is="chipi-result" class="result is-list" tabindex="0">
        <div class="result-service avatar">
            <img src="img/avatar/${result.from.avatar}.jpg" class="avatar-user">
            <img src="img/logo/${result.channel.type}.svg" class="avatar-service">
        </div>
        <nav class="result-location">
            <ul>
                ${result.channel.location.map(val => `<li><button>${val}</button></li>`).join('')}
            </ul>
        </nav>
        <h2 class="result-title" title="${result.title}">${result.title}</h2>
        <time class="result-time">${time.toDateString()}</time>
        <p class="result-description">${result.excerpt}</p>
    </article>
    `;
}
