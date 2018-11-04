import Logo from './components/logo.js';
import SearchSuggestion from './components/search-suggestion.js';
import SearchForm from './components/search-form.js';
import Results from './components/results.js';
import app from './app.js';

//Register components
customElements.define('chipi-logo', Logo);
customElements.define('chipi-suggestion', SearchSuggestion);
customElements.define('chipi-search', SearchForm, { extends: 'form' });
customElements.define('chipi-results', Results, { extends: 'ul' });

//Start
app.go('start');