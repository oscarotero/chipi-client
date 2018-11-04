import { wait } from '../utils.js';

export default function (router) {
    const { logo, results } = router.data;

    logo.state = 'searching';
    results.classList.add('is-waiting');

    fetch('api/results.json')
        .then(res => res.json())
        .then(data => wait(data, 2000))
        .then(data => {
            results.classList.remove('is-waiting');
            results.innerHTML = renderResults(data);
            logo.state = ':p';
        })
}

function renderResults(results) {
    return results.map(result => {
        const time = new Date(result.time * 1000);
        return `
        <li>
            <article class="result" tabindex="0">
                <div class="result-service">
                    <img src="img/avatar/${result.from.avatar}.jpg" class="result-service-user">
                    <img src="img/logo/${result.channel.type}.svg" class="result-service-type">
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
        </li>
        `;
    }).join('');
}