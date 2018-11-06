import App from '../../utils/app.js';

import routeShow from './route-show.js';

//Create the app
const detailsApp = new App();

//Add routes
detailsApp.on('show', routeShow);

export default detailsApp;