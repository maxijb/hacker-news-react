import Firebase from 'firebase';
import {itemsPerPage} from '../constants/Constants';

const api = new Firebase('https://hacker-news.firebaseio.com/v0');

///////////////////////////////////
//We'll store the actual data here
let _items = [];
let _type = "";
///////////////////////////////////

/* Requests data for an specific item 
@param id (number)
@return promise
*/
function itemRef(id) {
  return api.child('item/' + id).once('value');
}


/* Requests details for a list of items
according to the desired offset
@param offset (number) pagination 
@return promises
*/
function getDetailedStories(offset = 1) {
  let promises = [];

  let min = (offset - 1) * itemsPerPage;
  let max = min + itemsPerPage;

  //create an array of promises for each individual item
  for (let i = min; i < max; i++ ) {
    promises.push(itemRef(_items[i]));
  }

  //when they are all resolved, return data for all of them
  return Promise.all(promises)
    .then(response => {
      return {
        type: _type,
        offset,
        items: response.map(x => x.val()).filter(x=> !!x)
      }
    });
}


/* Request topstories, with the desired type and offset
@param type (string)
@param offset (number)
@return promise
*/
function getStories(type, offset = 1) {
  //if type has changed request new items
  if (type != _type) {
    _type = type;
    return api.child(type + 'stories')
          .once('value')
          .then(response => {
            _items = response.val();
            return getDetailedStories(offset);
          });
  } else {
    //otherwise just request details for existing items
    return getDetailedStories(offset);
  }
}


//Exposed API
export default {
  getStories
}