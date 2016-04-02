/* Main file of our backend app.
   Sets the server, the routes, start the dataset
*/

import {default as express} from 'express';
import {default as React} from 'react';
import {default as ReactDOMServer} from 'react-dom/server';
import {default as AppComponent} from '../assets/js/components/App';


/* -------------- Config Application and Bootstrap ------------- */
	
	//Start app and configure views and assets
    let app = express();
	
	app
		//configure views
		.engine('jade', require('jade').__express)
		.set('view engine', 'jade')
		//sattic assets
		.use('/static', express.static(__dirname + '/../assets/public'))
		//start server
		.listen(process.env.PORT || 5000, function() {
		  console.log('Listening on port 5000...')
		});


/* -------------- Server routes ------------- */

	//Default controller to render react views server side
	//As it only renders common markup to all pages
	//It's being used by all urls, then the dynamic content is rendered client-side
	const controller = (req, res) => {
	  res.render('index', {
	  	  app: ReactDOMServer.renderToString(React.createElement(AppComponent, {}))
	  })
	}

	// Render static pages with React app
	// Routing all url to default controller
	['/', '/new', '/job', '/show', '/ask', '/top'].forEach(path => {
		app.get(path, controller);
	});

	