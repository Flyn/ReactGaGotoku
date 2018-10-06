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
    let eatin, takeout;

    if (!this.props.location) return null;

    if (this.props.location.type == 'Restaurant') {
      if (this.props.location.eatin && this.props.location.eatin.length > 0) {
        eatin =
        <Menu
          items={this.props.location.eatin}
          title='Eat in'/>
        ;
      }
      if (this.props.location.takeout && this.props.location.takeout.length > 0) {
        takeout =
        <Menu
          items={this.props.location.takeout}
          title='Take-out'/>
        ;
      }
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
        {eatin}
        {takeout}
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
