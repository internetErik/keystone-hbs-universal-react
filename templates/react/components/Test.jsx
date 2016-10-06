var React = require('react');

module.exports = React.createClass({
  _clickHandler: function() {
    alert();
  },
  render: function() {
    return (
      <section id="app">
        <h1>{this.props.title}</h1>
        <button onClick={this._clickHandler}>Click Me!</button>
      </section>
    );
  }
});