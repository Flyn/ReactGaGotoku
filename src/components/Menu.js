import React from 'react';
import { connect } from "react-redux";

export default class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    let items = this.props.items || [];
    let menuItems = items.map(function(item) {
      return <div key={item.name} className='menu-item'>
        <div className='name'>
          {item.name}
        </div>
        <div className='price'>
          {item.price}
        </div>
      </div>;
    });

    return (
      <div className='menu'>
        <div className='menu-item'><div className='name menu-header'>Name</div><div className='price menu-header'>Price</div></div>
        {menuItems}
      </div>
    );
  }
}
