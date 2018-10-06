import React from 'react';
import Menu from './Menu';
import { connect } from "react-redux";

class LocationDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    let menu;

    if (this.props.location.type == 'Restaurant') {
      menu = <Menu items={this.props.location.items}/>;
    }

    return (
      <div className="details">
        <div className="type">
          {this.props.location.type}
        </div>
        <div className="name">
          {this.props.location.name}
        </div>
        <div className="description">
          {this.props.location.description}
        </div>
        {menu}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    location: state.selectedLocation
  };
};

export default connect(mapStateToProps)(LocationDetails);
