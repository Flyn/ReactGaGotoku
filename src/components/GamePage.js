import React from 'react';
import { Link } from 'react-router-dom'

export default class GamePage extends React.Component {
  render() {
    return (
      <div className="RegionList">
        <Link to='map/gion'>Gion</Link>
      </div>
    );
  }
}
