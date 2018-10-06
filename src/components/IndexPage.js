import React from 'react';
import { Link } from 'react-router-dom'

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="GameList">
        <Link to='/kenzan/' className='kenzan-icon'>Kenzan</Link>
        <Link to='/ishin/' className='ishin-icon'>Ishin</Link>
      </div>
    );
  }
}
