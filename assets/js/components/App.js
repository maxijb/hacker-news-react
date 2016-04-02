/* Main application component at the root of the react tree 
  It's rendered both server and client side.
  When on the client, we need to check for 'window' and start the react element 
  on the '#react-root' div
*/

require("babel-polyfill");

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
    
    //subscribe to the UIState change and set state accordingly
    DataStore.on(events.change, this.handleChange);

    //emit that the app has been loaded
    DataActions.appLoad();
  },  


  //Empty app state
  getInitialState() {
    return {
      items: [],
      type: '',
      offset: 1
    }
  },


  //Update the state when mapStore changes
  //@param state is the store's state
  handleChange(state) {
    this.setState(Object.assign({}, this.state, state));
  },


  //Change the type of post
  changeType(type) {
    DataActions.requestItems(type, 1);
  },

  //Change page pagination
  //@param offset (int) page
  changeOffset(offset) {
    DataActions.requestItems(this.state.type, offset);
  },

  render() {
    return (
    	<div id="main-app">
    		<NewsHeader selected={this.state.type} changeType={this.changeType} />
        <NewsList items={this.state.items} 
            loading={this.state.loading} 
            offset={this.state.offset} 
            changeOffset={this.changeOffset}
            serverSide={typeof window === "undefined"}
            />
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