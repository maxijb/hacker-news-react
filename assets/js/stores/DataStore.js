/* Store with information about the sidebar and its items */

import {default as pubsub} from '../dispatcher/Dispatcher';
import {events, actions} from '../constants/Constants';
import {EventEmitter} from 'events';

const DataStore = Object.assign({}, EventEmitter.prototype, (() => {

	//Default state container
	let _state = {
		listItems: [],
		loading: false,
		complete: false
	};

	//Setting event Listeners, coming from actions
	pubsub
		//add new items
		.on(actions.addSidebarItems, (response) => {
			_state.complete = response.complete;
			_state.listItems = _state.listItems.concat(response.items);
			_state.loading = false;
			DataStore.emitChange();
		})
		//replace the old items with these new
		.on(actions.setSidebarItems, (response) => {
			_state.complete = response.complete;
			_state.listItems = response.items;
			_state.loading = false;
			DataStore.emitChange();
		})
		//loding state
		.on(actions.sidebarItemsWillBeSet, () => {
			_state.listItems = [];
			_state.loading = "full";
			DataStore.emitChange();
		})
		//loding state on scroll
		.on(actions.sidebarItemsWillBeAdded, () => {
			_state.loading = "partial";
			DataStore.emitChange();
		});
	
	//Export public API
	return {
		//Getter to the state
		getState() { return _state },

		//Emit the change event for the views
		emitChange() { 
			this.emit(events.change, _state);
		}
	}


})());



export default DataStore;