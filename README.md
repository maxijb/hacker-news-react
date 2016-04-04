# hacker-news-react

**Objective:** Create a clone of Hacker News, using a modern framework and an open API

**How to run:** 
```
$ git clone [this Repo]
$ npm install
$ npm start
```
Usually this is all it takes, since I've committed the bundled JS and CSS, and the preprocessed data. Otherwise we would also need these commands before starting:
```
$ grunt build
```

**Tech stack:** 
- Both the frontend and the backend are written on ES6, and transpiled with Babel. 
- The static view is rendered with Jade, all the dynamic HTML by React.
- The styling is done with LessCSS.
- The backend is a NodeJS application, powered by Express.
- The data is coming from an open API, powered by Firebase, which communicates with it's server by websockets (when they're available)
- The static assets are being handled by Grunt. And all the JS modules are being bundled by browserify.
- Tested on IE 9+, Chrome, FF


**Architecture**   
The flow of the data in the frontend uses a "flux-like" approach. As the views are rendered by React, these call actions on the action creators. These "action creators" are encharged of communicating with the server and trigger actions that modify the stated of the "stores".   
Between actions and stores, the dispatcher publishes the events. For the scope of this app, we didn't need all the overhead of the Facebook's dispatcher, and ended up using Node's standard Pub/Sub module.    

The initial view is rendered server side, including the React 'App' component into the static Jade view. Then, the rest of the application works cliente side, rendering the data loaded by AJAX. The state is kept in the URL using history.pushState (where available) and falling back to a hash fragment in old browsers.


**What could be improved**
- For the sake of simplicity, I printed English texts, where we usually would include variables that could be easily internationalized. 
- The JS and CSS bundles are only one, when tipycally I would create one bundle for the app, and another for libraries  (which change less frequently). That way we could take more advantage of the browser's cache. 
- Of course, we are lacking tests. 


I hope you enjoy it, guys! I had a lot of fun coding it...
Cheers!

[LINK: https://vimpelcom-ynews.herokuapp.com](https://vimpelcom-ynews.herokuapp.com)








