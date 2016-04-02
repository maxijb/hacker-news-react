/* Actions related to the app's data.
*/ 

import {default as pubsub} from '../dispatcher/Dispatcher';
import {actions, urls} from '../constants/Constants';
import {queryString} from '../components/helpers/helpers';
import {default as Service} from './Service';

var DataActions = (function() {


  /* Update url with pushState or hash
     according to the filtering params */
  const updateURL = (type, offset) => {
    
    if (type == "top" && offset == 1) return;

    //modern browsers
    if (history && history.pushState) {
      history.pushState(false, {}, `/${type}?page=${offset}`);
    } else {
      //old browsers
      window.location.hash = `${type}&page=${offset}`;
    }
  }


  /* Request items to show
    @parma type (string) tyoe of items
    @param offset (int) page offset
    */
  const requestItems = (type, offset=1) => {

    updateURL(type, offset);
    pubsub.emit(actions.itemsWillBeSet, type);

    Service
      .getStories(type, offset)
      .then((response) => {
        pubsub.emit(actions.itemsLoaded, response);
      });

  }


  /* First load of the app. Parse URL and request items */
  const appLoad = () => {
    let type, offset;

    //modern browsers
    if (history && history.pushState && !window.location.hash) {
      type = window.location.pathname.substr(1);
      offset = window.location.search.split('=')[1]
    } 

    //hash overrides push states (someone could share an url from an old browser)
    if (window.location.hash) {
      let hash = window.location.hash.split('?');
      if (hash.length > 1) {
        type = hash[0].substr(1);
        offset = hash[1].split('=')[1];
      }
    }

    requestItems(type || "top", offset || 1);
  }


  /* Exposed methods */
  return {
    requestItems,
    appLoad
  }


})();


export default DataActions;