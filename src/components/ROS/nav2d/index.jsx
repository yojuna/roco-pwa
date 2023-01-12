import React, {Component} from 'react'
import NAV2D from '@/lib/ROS/nav2d_react'
import ROS2D from '@/lib/ROS/ros2d_react'
import ROSLIB from 'roslib'
import PropTypes from 'prop-types';
import { ngrok_uri } from '@/config'

class Nav2d extends Component {

  componentDidMount(){
    const ros = this.props.ros;
    const viewer = new ROS2D.Viewer({
      divID : this.props.id,
      width : this.props.width,
      height : this.props.height
    });
    const nav = NAV2D.OccupancyGridClientNav({
      ros : ros,
      rootObject : viewer.scene,
      viewer : viewer,
      serverName : this.props.serverName
    });
  }
  
  render() {
    return <div id={this.props.id}/>
  }
}

const ros_url = 'wss://'+ngrok_uri;

Nav2d.defaultProps = {
  ros: new ROSLIB.Ros({
    url : ros_url
  }),
  id: 'nav2d',
  width: 500,
  height: 500,
  serverName: '/move_base'
};

Nav2d.propTypes = {
  ros: PropTypes.object,
  id: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  serverName: PropTypes.string
}

export default Nav2d