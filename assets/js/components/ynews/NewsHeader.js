import React from 'react';

const NewsHeader = React.createClass({
  
  propTypes: {
    selected: React.PropTypes.string,
    changeType: React.PropTypes.func
  },


  /* Default props include the 4 categories of queries */
  getDefaultProps() {
    return {
      navLinks: [
        {
          name: 'new',
          url: 'new'
        },
        {
          name: 'show',
          url: 'show'
        },
        {
          name: 'ask',
          url: 'ask'
        },
        {
          name: 'jobs',
          url: 'job'
        }
      ]
    }
  },

  //Click on the header menu items
  //changes type of posts displayed
  //@param type (string) 
  //@param event (event)
  changeType(type, event) {
    event.preventDefault();
    //only trigger callback if the type is different
    if (type != this.props.selected) this.props.changeType(type);
  },


  /* Renders the navigation on the header */
  getNav() {

      return this.props.navLinks.map(navLink => {
          return (
            <a key={navLink.url} 
                className={"newsHeader-navLink newsHeader-textLink " + (this.props.selected == navLink.url ? "selected" : "")}
                onClick={this.changeType.bind(this, navLink.url)}>
              {navLink.name}
            </a>
          );
        });
  },


  render() {
    return (
      <div className="newsHeader">
        
        <div className="newsHeader-logo">
          <a href="/"><img src="/static/images/y18.gif"/></a>
        </div>

        <div className="newsHeader-title">
           <a className="newsHeader-textLink" href="/">Hacker News</a>
        </div>

        <div className="newsHeader-nav">
          {this.getNav()}
        </div>

      </div>
    );
  }
});

export default NewsHeader;
