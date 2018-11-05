//Register components
import Logo from './components/logo.js';
import Suggestion from './components/suggestion.js';
import Search from './components/search.js';
import Results from './components/results.js';
import Result from './components/result.js';
import Panel from './components/panel.js';

customElements.define('chipi-logo', Logo);
customElements.define('chipi-suggestion', Suggestion);
customElements.define('chipi-panel', Panel);
customElements.define('chipi-search', Search, { extends: 'form' });
customElements.define('chipi-results', Results, { extends: 'ul' });
customElements.define('chipi-result', Result, { extends: 'article' });

//Start the app
import app from './app/app.js';

app.go('start');