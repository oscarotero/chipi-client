import Logo from './components/logo.js';
import SearchSuggestion from './components/search-suggestion.js';
import SearchForm from './components/search-form.js';
import Results from './components/results.js';

customElements.define('chipi-logo', Logo);
customElements.define('chipi-suggestion', SearchSuggestion);
customElements.define('chipi-results', Results, { extends: 'ul' });
customElements.define('chipi-search', SearchForm, { extends: 'form' });

const logo = document.getElementById('chipi-logo');
const results = document.getElementById('search-results-list');
const search = document.getElementById('search-form');

//Load suggestions
fetch('api/suggestions.json')
    .then(res => res.json())
    .then(data => results.innerHTML = renderSuggestions(data))

//Load results
search.addEventListener('submit', e => {
    e.preventDefault();
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
})

function renderSuggestions(suggestions) {
    return suggestions.map(suggestion => `<li><chipi-suggestion tabindex="0">${suggestion}</chipi-suggestion></li>`).join('');
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

function wait(data, time) {
    return new Promise(resolve => setTimeout(() => resolve(data), time));
}