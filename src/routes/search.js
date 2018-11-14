import { api, html, onkeydown } from '../utils/helpers.js';

export default function(app, term) {
    const { logo, results, search } = app.data;
    search.value = term;

    results.innerHTML = '';

    api('results', logo).then(data => {
        //Escape
        onkeydown(['Escape', 'ArrowLeft'], resultsList, () => app.go('suggestions'));

        //Link search + flags + results
        search.bottomFocusableElement = flagsList;
        flagsList.topFocusableElement = search;
        flagsList.bottomFocusableElement = resultsList;
        resultsList.topFocusableElement = flagsList;

        results.append(flags);
        results.append(resultsList);
        search.input.focus();
    });
}
