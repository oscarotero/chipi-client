import { api, parse } from '../utils/helpers.js';

let cache;

export default function(app) {
    const { container, results, search, logo } = app.data;
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
        //Render suggestions
        const html = parse(
            '<ul is="chipi-navlist">',
            data.map(text => `<li><chipi-suggestion tabindex="0">${text}</chipi-suggestion></li>`).join(''),
            '</ul>'
        );

        //Click suggestions
        html.querySelectorAll('chipi-suggestion').forEach(suggestion =>
            suggestion.addEventListener('click', () => {
                search.value = suggestion.value;
                app.go('search');
            })
        );

        results.innerHTML = '';
        results.append(html);
        search.input.focus();
    }
}
