import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class App extends React.Component {
  render(props) {
    return (
    <div>
      <h1>React</h1>
      <Link to="/sessions">Sessions</Link>
    </div>
    );
  }
}

export default App;