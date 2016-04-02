/* Store with information about the sidebar and its items */

import {default as pubsub} from '../dispatcher/Dispatcher';
import {events, actions} from '../constants/Constants';
import {EventEmitter} from 'events';


const DataStore = Object.assign({}, EventEmitter.prototype, (() => {

	//Default state container
	let _state = {
		items: [],
		loading: false,
		complete: false,
		type: ""
	};

	//Setting event Listeners, coming from actions
	pubsub
	// 	//add new items
		.on(actions.itemsLoaded, (response) => {
			_state.items = response.items;
			_state.offset = response.offset;
			_state.type = response.type;
			_state.loading = false;
			DataStore.emitChange();
		})
		//items are being requested
		.on(actions.itemsWillBeSet, (type) => {
			_state.type = type;
			_state.items = [];
			_state.loading = true;
			DataStore.emitChange();
		})
	

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