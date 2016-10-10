import React from 'react';
import fetch from 'isomorphic-fetch';
console.log(fetch);
class AboutPage extends React.Component {
  componentDidMount() {
    fetch('/api/post');
  }
  render() {
    return (
      <h1>About Page!</h1>
    );
  }
}

export default AboutPage;