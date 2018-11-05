import Logo from './components/logo.js';
import Suggestion from './components/suggestion.js';
import Search from './components/search.js';
import Results from './components/results.js';
import Panel from './components/panel.js';

import mainApp from './router/main.js';

//Register components
customElements.define('chipi-logo', Logo);
customElements.define('chipi-suggestion', Suggestion);
customElements.define('chipi-panel', Panel);
customElements.define('chipi-search', Search, { extends: 'form' });
customElements.define('chipi-results', Results, { extends: 'ul' });

//Start
mainApp.go('start');