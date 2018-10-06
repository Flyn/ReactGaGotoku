import React from 'react';

export default class GamePreview extends React.Component {
  render() {
    return (
      <div className="Game">
        {this.props.name}
      </div>
    );
  }
}
