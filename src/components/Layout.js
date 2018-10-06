import React from 'react';
import { Link } from 'react-router-dom';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to='/' className='app-title'>React Ga Gotoku</Link>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>

          </p>
        </footer>
      </div>
    );
  }
}
