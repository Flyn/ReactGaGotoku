import React from 'react';

export default class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      translation : {
        x : 0,
        y : 0
      },
      zoom : 1,
      dragging : false
    }

    //this.handleClick = this.handleClick.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.canvas = document.getElementById('mapview');
    var ctx = this.canvas.getContext('2d');

    this.img = new Image();
    this.img.src = this.props.image;
    this.img.addEventListener('load', (function() {
      this.redraw()
    }).bind(this), false);

    this.circle = new Image();
    this.circle.src = require('../static/circle.png');

    this.canvas.addEventListener('mousedown',this.mouseDown, false);
    this.canvas.addEventListener('mousemove',this.mouseMove, false);
    this.canvas.addEventListener('mouseup',this.mouseUp, false);
    this.canvas.addEventListener('DOMMouseScroll',this.handleScroll, false);
    this.canvas.addEventListener('mousewheel',this.handleScroll, false);

    this.props.selectArea();

  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousedown',this.mouseDown);
    this.canvas.removeEventListener('mousemove',this.mouseMove);
    this.canvas.removeEventListener('mouseup',this.mouseUp);
    this.canvas.removeEventListener('DOMMouseScroll',this.handleScroll);
    this.canvas.removeEventListener('mousewheel',this.handleScroll);
  }

  mouseDown(e) {
    var mousex = e.offsetX || e.pageX-e.target.offsetLeft;
    var mousey = e.offsetY || e.pageY-e.target.offsetTop;

    this.setState(state => ({
      dragging : false,
      startDrag : {
        x : (mousex - state.translation.x),
        y : (mousey - state.translation.y)
      }
    }));

  }

  mouseMove(e) {
    var mousex = e.offsetX || e.pageX-e.target.offsetLeft;
    var mousey = e.offsetY || e.pageY-e.target.offsetTop;

    this.setState({
      dragging : true,
    });

    if (this.state.startDrag) {
      this.setState(state => ({
        translation : {
          x : mousex - state.startDrag.x,
          y : mousey - state.startDrag.y
        }
      }));
    }

  }

  mouseUp(e) {
    this.setState({
      startDrag : null
    });
    if (!this.state.dragging) {
      // Click
      var mousex = e.offsetX || e.pageX-e.target.offsetLeft;
      var mousey = e.offsetY || e.pageY-e.target.offsetTop;
      console.log(mousex, mousey);
      var mapCoords = this.getMapCoords(mousex, mousey);
      this.select(mapCoords.x, mapCoords.y);

      if (mousex < 155 && mousey < 32) {
        this.fullMap();
      }
    }
  }

  handleScroll(e) {
    e.preventDefault();
    var delta = e.wheelDelta ? e.wheelDelta/40 : e.detail ? -e.detail : 0;
    this.setState(function(state) {
      var newzoom = state.zoom + delta / 40;
      if (newzoom < 1) newzoom = 1;
      return {
        zoom : newzoom
      }
    });
  }

  select(x, y) {
    var overArea = this.getOverArea(x, y);
    if (overArea) {
      this.setState({
        selectedArea : overArea
      });
      this.props.selectArea(overArea.id);
    } else {
      this.setState({
        selectedArea : null
      });
      this.props.selectArea();
    }
  }

  getOverArea(x, y) {
    var detectedAreas = this.props.areas.filter((area) => {
      if (x >= area.left && x <= area.right && y >= area.top && y <= area.bottom) {
        return true;
      } else return false;
    });

    if (detectedAreas.length > 0) {
      return detectedAreas[0];
    }
  }

  fullMap() {
    this.setState({
      translation : {
        x : 0,
        y : 0
      },
      zoom : 1
    });
  }

  getMapCoords(x, y) {
    return {
      x: (x - this.state.translation.x) / this.state.zoom,
      y: (y - this.state.translation.y) / this.state.zoom
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.redraw();
  }

  redraw() {
    var area = this.state.selectedArea;

    var ctx = this.canvas.getContext('2d');

    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

    //ctx.setTransform(this.state.zoom, 0, 0, this.state.zoom, this.state.translation.x, this.state.translation.y);
    //ctx.translate(-this.state.translation.x, -this.state.translation.y);
    ctx.translate(this.state.translation.x, this.state.translation.y);
    ctx.scale(this.state.zoom, this.state.zoom);
    //ctx.translate(this.state.translation.x, this.state.translation.y);
    ctx.drawImage(this.img, 0, 0);

    if (this.props.pins) {
      this.props.pins.forEach(function(pin) {
        ctx.fillStyle = 'rgba(255,0,0,1)';
        ctx.beginPath();
        ctx.arc(pin.x, pin.y, 8,0,2*Math.PI);
        ctx.fill();
      });
    }

    if (area) {
      //ctx.fillStyle = 'rgba(255,0,0,0.5)';
      ctx.drawImage(this.circle, area.left, area.top, area.right-area.left, area.bottom-area.top);
    }

    ctx.setTransform(1,0,0,1,0,0);
    if (this.state.zoom != 1 || this.state.translation.x != 0 || this.state.translation.y != 0) {
      ctx.fillStyle = 'rgba(255,255,255,1)';
      ctx.fillRect(0,0,155,32);
      ctx.fillStyle = 'rgba(15,15,15,1)'
      ctx.font = "bold 24pt Arial";
      ctx.textAlign="center";
      ctx.fillText("Full Map",80,26);
    }

  }

  render() {
    return (
      <div>
      <canvas id='mapview' className='clickable-map' width='720' height='800'/>
      </div>
    );
  }
}
