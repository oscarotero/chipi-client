// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import Logo from './components/logo.js';
import SearchSuggestion from './components/search-suggestion.js';

customElements.define('chipi-logo', Logo);
customElements.define('chipi-suggestion', SearchSuggestion);
