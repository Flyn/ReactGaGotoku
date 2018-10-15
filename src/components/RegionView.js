import React from 'react';
import Map from './Map';
import LocationDetails from './LocationDetails';

import { connect } from 'react-redux';
import {selectLocation, fetchDetails} from '../actions/index'

const mapDispatchToProps = dispatch => {
  return {
    selectLocation: location => dispatch(selectLocation(location)),
    locations: (game, region, id) => dispatch(fetchDetails(game, region, id))
  };
};

class RegionView extends React.Component {

  constructor(props) {
    super(props);

    this.selectArea = this.selectArea.bind(this);

    this.areas = [{
      id : 'nakamura',
      left : 380,
      top : 360,
      right : 416,
      bottom : 402
    },{
      id : 'ginya',
      left : 370,
      top : 184,
      right : 425,
      bottom : 220
    }];

    this.pins = [{
      id : 'substory-1',
      x : 310,
      y : 590
    }, {
      id : 'substory-2',
      x : 508,
      y : 275
    }];

  }

  componentDidMount() {

  }

  selectArea(areaId) {
    var region = this.props.region || this.props.match.params.region;
    var game = this.props.game || this.props.match.params.game;

    if (areaId) {
      this.props.locations(game, region, areaId).then((action) => this.props.selectLocation(action.details));
    } else {
      this.props.selectLocation()
    }
  }

  render() {
    var region = this.props.region || this.props.match.params.region;
    var game = this.props.game || this.props.match.params.game;

    return (
      <div className="region-view">
        <div className="title">
          {region}
        </div>
        <div className="interface">
          <div className="region-map">
            <Map image={require('../static/'+region+'.gif')} selectArea={this.selectArea} pins={this.pins} areas={this.areas}/>
          </div>
          <LocationDetails/>
        </div>
      </div>
    );
  }
};

export default connect(null, mapDispatchToProps)(RegionView);
