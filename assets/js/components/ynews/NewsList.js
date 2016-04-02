import React  from 'react';
import NewsItem  from './NewsItem';
import {maxOffset, itemsPerPage} from '../../constants/Constants';

const NewsList = React.createClass({
  

  propTypes: {
    items: React.PropTypes.array,
    loading: React.PropTypes.bool,
    offset: React.PropTypes.number,
    changeOffset: React.PropTypes.func,
    serverSide: React.PropTypes.bool
  },

  /*Default props */
  getDefaultProps() {
    return {items: []}
  },

  /* Changes the pagination 
    @param offset (int) new page
  */
  changeOffset(offset) {
    this.props.changeOffset(offset);
  },

  render: function () {

    return (
      <div className="newsList">
        <div className="newsList-items">
          
          {(() => {
            return this.props.loading ? (
              <p className="loading">
                <img src="/static/images/spin.gif" />
                Loading...
              </p>) : null;
          })()}

          {
            this.props.items.map((item, index) => {
              return !item ? null : (
                <NewsItem key={item.id} item={item} rank={index + 1 + (this.props.offset - 1) * itemsPerPage } />
              );
            })
          }
        
        </div>

        <div className="newsList-more">
          {(() => {
            if (this.props.items.length && this.props.offset < maxOffset) 
                  return (<a className="newsList-moreLink" onClick={this.changeOffset.bind(this, (this.props.offset +1)) }>More</a>) 
            else if (!this.props.serverSide && !this.props.loading && !this.props.length)
                  return (<a className="newsList-nomoreLink">No more results</a>) 
          })()}
        </div>

      </div>
    );
  }
});

module.exports = NewsList;
