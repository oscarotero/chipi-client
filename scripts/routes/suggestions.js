import { api, html } from '../utils/helpers.js';

let cache;

export default function(app) {
    const { results, search, logo } = app.data;
    search.value = '';

    if (cache) {
        render(cache);
    } else {
        api('suggestions', logo).then(data => {
            cache = data;
            render(data);
        });
    }

    function render(data) {
        results.innerHTML = '';

        const suggestions = html`
        <ul is="chipi-navlist">
        ${data.map(text => html`<li>${renderSuggestion(text)}</li>`)}
        </ul>`;

        suggestions.previousFocusableElement = search;
        results.append(suggestions);
        search.input.focus();
    }

    function renderSuggestion(data) {
        const element = html`<chipi-suggestion tabindex="0">${data}</chipi-suggestion>`;
        element.addEventListener('click', () => app.go('search', data));

        return element;
    }
}
