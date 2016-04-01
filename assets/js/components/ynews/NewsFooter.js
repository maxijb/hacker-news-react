import React from 'react';

const NewsFooter = React.createClass({
  
  render() {
    return (
     <center id="footer">
        <span className="yclinks">
          <a href="newsguidelines.html">Guidelines</a>
        | <a href="newsfaq.html">FAQ</a>
        | <a href="mailto:hn@ycombinator.com">Support</a>
        | <a href="https://github.com/HackerNews/API">API</a>
        | <a href="security.html">Security</a>
        | <a href="lists">Lists</a>
        | <a href="bookmarklet.html">Bookmarklet</a>
        | <a href="dmca.html">DMCA</a>
        | <a href="http://www.ycombinator.com/apply/">Apply to YC</a>
        | <a href="mailto:hn@ycombinator.com">Contact</a>
        </span>
        
        <form method="get" action="//hn.algolia.com/">
          Search:
          <input type="text" name="q" size="17" autoCorrect="off" spellCheck="false" autoCapitalize="off" autoComplete="false" />
        </form>
      </center>
    );
  }
});

export default NewsFooter;
