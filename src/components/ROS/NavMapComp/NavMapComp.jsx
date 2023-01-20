import React, { useEffect } from 'react'
import NAV2D from '@/lib/ROS/nav2d_react'
import ROS2D from '@/lib/ROS/ros2d_react'
import ROSLIB from 'roslib'
import PropTypes from 'prop-types';
import { ngrok_uri } from '@/config'


function NavMapComp(props){

  useEffect(() => {    
    const rosUrl = 'wss://'+ngrok_uri

    // Connect to ROS.
    var ros = new ROSLIB.Ros({
      url : rosUrl
    });
  
    // Create the main viewer.
    var viewer = new ROS2D.Viewer({
      divID : props.divID,
      width : props.width,
      height : props.height
    });
  
    // Setup the nav client.
    var nav = new NAV2D.OccupancyGridClientNav({
      ros : ros,
      rootObject : viewer.scene,
      viewer : viewer,
      serverName : props.serverName
    });

  });

      return (
          <div id={ props.divID }/>
      );
  }

// const ros_url = ;
// // // const ros_url = 'ws://localhost:9090';

NavMapComp.defaultProps = {
  ros: new ROSLIB.Ros({
    url : 'wss://'+ngrok_uri
  }),
  divID: 'nav2d',
  width: 500,
  height: 500,
  serverName: '/move_base'
};

NavMapComp.propTypes = {
  ros: PropTypes.object,
  divID: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  serverName: PropTypes.string
}

export default NavMapComp
