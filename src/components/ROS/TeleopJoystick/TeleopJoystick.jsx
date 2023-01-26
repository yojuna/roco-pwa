import React, { useEffect, useState } from 'react'
// import NAV2D from '@/lib/ROS/nav2d_react'
// import ROS2D from '@/lib/ROS/ros2d_react'
import ROSLIB from 'roslib'
import PropTypes from 'prop-types';
import { ngrok_uri } from '@/config'
// import { Joystick } from 'react-joystick-component';
import ROSJoystick from './ROSJoystick';


function TeleopJoystick(props){

  const [ nav, setNav] = useState('stationary');

  useEffect(() => {    
    // const rosUrl = 'wss://'+ngrok_uri

    // Connect to ROS.
    var ros = props.ros;
  
    var cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : '/cmd_vel',
        messageType : 'geometry_msgs/Twist'
      });
      
  });
    var state = props.state;

    // var angularVel = ;
    // var angularVel = ;

    var twist = new ROSLIB.Message({
        linear : {
            x : state.data.position.x,
            y : state.data.position.y,
            z : 0
        },
        angular : {
            x : 0.0,
            y : 0.0,
            z : -0.3
        }
    });
        cmdVel.publish(twist);

  return (
    <div id={props.divID}>
      <ROSJoystick
        title={props.title}
        width={props.width}
        height={props.height}
        options={props.options}
        />
    </div>
  );
}


TeleopJoystick.defaultProps = {
  title: 'tb3 teleop joystick',
  ros: new ROSLIB.Ros({
    url : 'wss://'+ngrok_uri
  }),
  divID: 'teleop',
  width: 500,
  height: 500,
  serverName: '/move_base',
  options: {
    mode: "static",
    color: "blue",
    position: { top: "50%", left: "50%" }
  }
};

TeleopJoystick.propTypes = {
  title: PropTypes.string,
  ros: PropTypes.object,
  divID: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  serverName: PropTypes.string,
  options: PropTypes.object,
}

export default TeleopJoystick



// const handleStart = () => {
//     console.log('started'); 
//   }

//   const handleMove = () => {
//     console.log('moved'); 
//   }

//   const handleStop = () => {
//     console.log('stopped'); 
//   }
// <Joystick start={handleStart} move={handleMove} stop={handleStop}/>



// var cmdVel = new ROSLIB.Topic({
//     ros : ros,
//     name : '/cmd_vel',
//     messageType : 'geometry_msgs/Twist'
//   });
  
//   var twist = new ROSLIB.Message({
//     linear : {
//       x : 0.1,
//       y : 0.2,
//       z : 0.3
//     },
//     angular : {
//       x : -0.1,
//       y : -0.2,
//       z : -0.3
//     }
//   });
//   cmdVel.publish(twist);