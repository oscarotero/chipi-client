import App from '../../utils/app.js';

import _show from './_show.js';

//Create the app
const detailsApp = new App();

//Add routes
detailsApp.on('show', _show);

export default detailsApp;