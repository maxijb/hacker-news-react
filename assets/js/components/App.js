/* Main application component at the root of the react tree 
  It's rendered both server and client side.
  When on the client, we need to check for 'window' and start the react element 
  on the '#react-root' div
*/

require("babel-polyfill");
import {default as fetchPolifyl} from 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';

import {events, actions} from '../constants/Constants';

import DataActions from '../actions/DataActions';
import DataStore from '../stores/DataStore';

import NewsHeader from './ynews/NewsHeader';
import NewsList from './ynews/NewsList';
import NewsFooter from './ynews/NewsFooter';


let App = React.createClass({
  
  componentDidMount() {
    //emit that the app has been loaded
    DataActions.appLoad();

    //subscribe to the UIState change and set state accordingly
    DataStore.on(events.change, this.handleChange);

  },  


  getInitialState() {
    return {
      items: [],
      selected: 'news'
    }
  },


  //Update the state when mapStore changes
  //@param state is the store's state
  handleChange(state) {
    this.setState({news: state.news});
  },


  render() {
    return (
    	<div id="main-app">
    		<NewsHeader selected={this.state.selected} />
        <NewsList items={this.state.items} />
        <NewsFooter />
    	</div>
  	);
  }
});

export default App;

//Start the app in the browser
if (typeof window !== "undefined") {
  ReactDOM.render(React.createElement(App, {}), document.getElementById('react-root'));
}