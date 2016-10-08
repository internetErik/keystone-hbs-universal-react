import React from 'react';

class App extends React.Component {
  render() {
    return (
      <section>
        This is the App.js!
        {this.props.children}
      </section>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
}

export default App;
