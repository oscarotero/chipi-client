import { api, parse } from '../utils/helpers.js';

export default function(app) {
    const { results, search, logo } = app.data;
    
    api('suggestions', logo).then(data => {
        //Render suggestions
        const html = parse(
            '<ul is="chipi-results">',
            data.map(text => `<li><chipi-suggestion tabindex="0">${text}</chipi-suggestion></li>`).join(''),
            '</ul>'
        );

        //Click suggestions
        html.querySelectorAll('chipi-suggestion').forEach(suggestion => 
            suggestion.addEventListener('click', () => {
                search.value = suggestion.value;
                app.go('search');
            })
        )
        
        results.innerHTML = '';
        results.append(html);
    });
}
