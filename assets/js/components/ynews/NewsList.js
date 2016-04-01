var React = require('react');
var NewsItem = require('./NewsItem');

var NewsList = React.createClass({
  

  render: function () {
    return (
      <div className="newsList">
        <div className="newsList-items">
          
          {
            this.props.items.map((item, index) => {
              return (
                <NewsItem key={item.id} item={item} rank={index + 1} />
              );
            })
          }
        
        </div>

        <div className="newsList-more">
          {() => {
            return this.props.items.length ? (<a className="newsList-moreLink" href="https://news.ycombinator.com/news?p=2">More</a>) : null;
            
          }}
        </div>

      </div>
    );
  }
});

module.exports = NewsList;
