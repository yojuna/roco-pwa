import React, { useState, useEffect } from "react";
import ReactNipple from "react-nipple";
import DebugView from "react-nipple/lib/DebugView";
//import { moveRobot } from "../utils/ROS/ROSFunctions";

import ROSLIB from 'roslib'
import PropTypes from 'prop-types';
import { ngrok_uri } from '@/config'

function Joystick() {
  // state
  const [data, setData] = useState();
  const [twist, setTwist] = useState();
//   const [state, setState] = useState({
//     axes: [0, 0, 0, 0, 0, 0],
//     buttons: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   });

//   const [cmdVelState, setCmdVelState] = useState();


  const LIN_VEL_STEP_SIZE = 0.01
  const ANG_VEL_STEP_SIZE = 0.1  

    var linearVel = 0.0;
    var angularVel = 0.0;


//   var cmdVel = undefined

  var twistMsg = new ROSLIB.Message({
    linear : {
        x : linearVel,
        y : 0.0,
        z : 0.0
    },
    angular : {
        x : 0.0,
        y : 0.0,
        z : angularVel
    }
    });

    setTwist(twistMsg)


  useEffect(() => {
    // moveRobot({ axes: state.axes, buttons: state.buttons });
    // console.log(state.axes);
 
     // const rosUrl = 'wss://'+ngrok_uri
 
     // Connect to ROS.
     var ros = new ROSLIB.Ros({
         url : 'wss://'+ngrok_uri
       });

    var cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : '/cmd_vel',
        messageType : 'geometry_msgs/Twist'
        });

    setCmdVelState(cmdVel)


          // cmdVel.publish(twist);

    });

    const handleJoystickMove = (evt, data) => {
        setData(data);
        const direction = data.direction.angle
        console.log('onmove direction: ', {direction})
    
        switch (direction) {
          case 'up':
            twist.linear.x = linearVel + LIN_VEL_STEP_SIZE;
            // console.log('Oranges are $0.59 a pound.');
            cmdVelState.publish(twist);
          case 'down':
            twist.linear.x = 0.0;
            twist.angular.z = 0.0;
          case 'left':
            twist.angular.z = angularVel + ANG_VEL_STEP_SIZE;
            // console.log('Mangoes and papayas are $2.79 a pound.');
          case 'right':
            twist.angular.z = angularVel - ANG_VEL_STEP_SIZE
          default:
            twist.linear.x = 0.0;
            twist.angular.z = 0.0;
        }
    
        console.log(twist);
        // cmdVelState.publish(twist);
    
      };

 

// ros version






  // functions
  const handleJoystickStart = (evt, data) => {
    setData(data);
  };

  const handleJoystickEnd = (evt, data) => {

    setData(data);
    
    setState({
      axes: [0, 0, 0, 0, 0, 0]
    });

  };



  const handleJoystickDir = (evt, data) => {
    setData(data);
/*
zone: document.getElementById('zone_joystick'),
        threshold: 0.1,
        position: { left: 50 + '%' },
        mode: 'static',
        size: 150,
        color: '#000000',

    manager.on('move', function (event, nipple) {*/
  //let max_linear = 5.0; // m/s
  //let max_angular = 2.0; // rad/s
  let max_distance = 75.0; // pixels;
  console.log("Senas ", data.distance);
  let y_direction = Math.sin(data.angle.radian);// *  data.distance/max_distance;
  let x_direction = -Math.cos(data.angle.radian);//  * data.distance/max_distance;
  let x_inverte = Math.cos(data.angle.radian);
  
  if(y_direction <= 0.2 || y_direction <= -0.2){
      y_direction = 0;
  }

    let x = data.direction.x === "right" ? 1 : -1;
    let y = data.direction.y === "up" ? 1 : -1;

   // let max_distance = 150 / 2;
     if(data.distance === 0){
      x = 0.0;
      y = 0.0;
    }

    setState({
      axes: [x, y, 0, 0, 0, 0],
      buttons: [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    });
     console.log("Direction x: "+ x_direction +"  y: "+ y_direction );
     console.log("Exos x: "+ x +"  y: "+ y )
     console.log("invertido x: ", x_inverte)
     console.log("direction: ", data.direction)
    // console.log(" valor diustancia  "+ data.angle.radian);
    //console.log(" valor linear_speed  "+ linear_speed);
    //console.log(" valor angular_speed  "+  angular_speed);
  };

  const handleJoystickPlain = (evt, data) => {
    setData(data);
  };

  const handleJoystickShown = (evt, data) => {
    setData(data);
  };

  const handleJoystickHidden = (evt, data) => {
    setData(data);
  };

  const handleJoystickPressure = (evt, data) => {
    setData(data);
  };

 

  return (
    <div>
      <div className="joystick-wrapper mt-5">
        <ReactNipple
          className="joystick is-relative"
          options={{
            mode: "static",
            color: "hsl(219, 84%, 56%)",
            position: { top: "50%", left: "50%" },
            size: 150,
            treshold: 0.1,
          }}
          style={{
            width: 250,
            height: 250,
          }}
          onStart={handleJoystickStart}
          onEnd={handleJoystickEnd}
          onMove={handleJoystickMove}
          onDir={handleJoystickDir}
          onPlain={handleJoystickPlain}
          onShown={handleJoystickShown}
          onHidden={handleJoystickHidden}
          onPressure={handleJoystickPressure}
        />
        <DebugView data={data} />
      </div>
    </div>
  );
}

export default Joystick;