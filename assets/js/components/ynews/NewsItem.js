var React = require('react');
var url = require('url');
var moment = require('moment');


var NewsItem = React.createClass({

  propTypes: {
    item: React.PropTypes.object.isRequired,
    rank: React.PropTypes.number
  },


  /* Render comment text */
  getCommentLink: function () {
    var commentText = 'discuss';
    if (this.props.item.kids && this.props.item.kids.length) {
      commentText = this.props.item.kids.length + ' comments';
    }

    return (
      <a href={'https://news.ycombinator.com/item?id=' + this.props.item.id}>{commentText}</a>
    );
  },

  /* Render domain, if available */
  getDomain: function () {
    return this.props.item.url ? '('+url.parse(this.props.item.url).hostname+')' : "";
  },


  /* Render subtext */
  getSubtext: function () {
    return (
      <div className="newsItem-subtext">
        {this.props.item.score} points by <a href={'https://news.ycombinator.com/user?id=' + this.props.item.by}>{this.props.item.by}</a> {moment.utc(this.props.item.time * 1000).fromNow()} | {this.getCommentLink()}
      </div>
    );
  },

  /* Render title */
  getTitle: function () {
    return (
      <div className="newsItem-title">
        <a className="newsItem-titleLink" href={this.props.item.url}>{this.props.item.title}</a>
        <span className="newsItem-domain">
          {this.getDomain()}
        </span>
      </div>
    );
  },


  render: function () {
    return (
      <div className="newsItem">
        <div className="newsItem-rank">
           {this.props.rank}.
        </div>
        <div className="newsItem-vote">
          <a href={'https://news.ycombinator.com/vote?for=' + this.props.item.id + '&dir=up&whence=news'}>
            <img src="/static/images/grayarrow.gif" width="10"/>
          </a>
        </div>
        <div className="newsItem-itemText">
          {this.getTitle()}
          {this.getSubtext()}
        </div>
      </div>
    );
  }
});

module.exports = NewsItem;
