import { api } from '../utils/helpers.js';

export default function(app) {
    const { results, logo } = app.data;

    api('suggestions', logo).then(data => results.innerHTML = renderSuggestions(data));
}

function renderSuggestions(suggestions) {
    return suggestions
        .map(
            suggestion =>
                `<li><chipi-suggestion tabindex="0">${suggestion}</chipi-suggestion></li>`
        )
        .join('');
}
