import Logo from './components/logo.js';
import SearchSuggestion from './components/search-suggestion.js';
// import Search from './components/search.js';
import SearchForm from './components/search-form.js';
import Results from './components/results.js';

customElements.define('chipi-logo', Logo);
customElements.define('chipi-suggestion', SearchSuggestion);
customElements.define('chipi-results', Results, { extends: 'ul' });
customElements.define('chipi-search', SearchForm, { extends: 'form' });

const results = document.getElementById('search-results-list');

//Load suggestions
fetch('api/suggestions.json')
    .then(res => res.json())
    .then(data => 
        results.innerHTML = data.map(suggestion => `<li><chipi-suggestion tabindex="0">${suggestion}</chipi-suggestion></li>`).join('')
    )


//WIP
// const search = new Search(
//     document.getElementById('search-form'),
//     document.getElementById('search-results')
// );
