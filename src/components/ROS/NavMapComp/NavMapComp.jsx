import React, { useEffect } from 'react'
import NAV2D from '@/lib/ROS/nav2d_react'
import ROS2D from '@/lib/ROS/ros2d_react'
// import NAV2D from '@/lib/ROS/nav2d'
// import ROS2D from '@/lib/ROS/ros2d'
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

    // Setup the map client.
    // var gridClient = new ROS2D.OccupancyGridClient({
    //   ros : ros,
    //   rootObject : viewer.scene
    // });
    // // Scale the canvas to fit to the map
    // gridClient.on('change', function(){
    //   viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    // });


  });

    // render(){
      return (
        <div>
          <div id={ props.divID }/>
        </div>
      );
    // };
  }




// function init() {
//   // Connect to ROS.
//   var ros = new ROSLIB.Ros({
//     url : 'wss://7859-2001-4dd5-aa75-0-494a-830b-22cc-6dfd.eu.ngrok.io'
//   });

//   // Create the main viewer.
//   var viewer = new ROS2D.Viewer({
//     divID : 'nav',
//     width : 750,
//     height : 800
//   });

//   // Setup the nav client.
//   var nav = NAV2D.OccupancyGridClientNav({
//     ros : ros,
//     rootObject : viewer.scene,
//     viewer : viewer,
//     serverName : '/pr2_move_base'
//   });
// }


  // class Nav2d extends Component {

  //   componentDidMount(){
  //     const ros = this.props.ros;
  //     const viewer = new ROS2D.Viewer({
  //       divID : this.props.id,
  //       width : this.props.width,
  //       height : this.props.height
  //     });
  //     const nav = new NAV2D.OccupancyGridClientNav({
  //       ros : ros,
  //       rootObject : viewer.scene,
  //       viewer : viewer,
  //       serverName : this.props.serverName
  //     });
  //   }
    
  //   // componentWillUnmount(){
  //   //   // var canvas = document.getElementById('canvas')
  //   //   // canvas = null;
  //   //   // const ros = this.props.ros;
  //   //   // ros.close;
  //   //   unmountComponentAtNode(document.getElementById(this.props.id));
  //   // }
  
  //   render() {
  //     return <div id={this.props.id}/>
  //   }
  // }
  


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