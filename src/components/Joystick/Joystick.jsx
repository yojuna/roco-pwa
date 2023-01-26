import React, { useState, useEffect, useContext, useMemo } from "react";
import ReactNipple from "react-nipple";
import DebugView from "react-nipple/lib/DebugView";
import debounce from 'lodash.debounce';
//import { moveRobot } from "../utils/ROS/ROSFunctions";

import ROSLIB from 'roslib'

import PropTypes from 'prop-types';
import { ngrok_uri } from '@/config'
import { Container } from "@mui/system";
import { ROS } from "../ROS";
import { ROSContext } from '../ROS/ROSContext';

import Paper from '@mui/material/Paper';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function Joystick() {
  const [ ros, setROS ] = useContext(ROSContext);
  // state
  const [data, setData] = useState();
  const [twist, setTwist] = useState({});
  const [vel, setVel] = useState({
    linearVel: 0.0,
    angularVel: 0.0
  });

//   const [cmdVelState, setCmdVelState] = useState();


  const LIN_VEL_STEP_SIZE = 0.1
  const ANG_VEL_STEP_SIZE = 0.05  

    // var linearVel = 0.0;
    // var angularVel = 0.0;


//   var cmdVel = undefined

 

    // setTwist(twistMsg)
    var cmdVel = null

  useEffect(() => {
    // var joystickROS = ros.ROS;
    // moveRobot({ axes: state.axes, buttons: state.buttons });
    // console.log(state.axes);
 
     // const rosUrl = 'wss://'+ngrok_uri
 
    //  // Connect to ROS.
    //  var ros = new ROSLIB.Ros({
    //      url : 'wss://'+ngrok_uri
    //    });

    var cmdVel = new ROSLIB.Topic({
        ros : ros.ROS,
        name : '/cmd_vel',
        messageType : 'geometry_msgs/Twist'
        });

    // // setCmdVelState(cmdVel)
    var velState = vel
    var velMsg = new ROSLIB.Message({
      linear : {
          x : velState.linearVel,
          y : 0.0,
          z : 0.0
      },
      angular : {
          x : 0.0,
          y : 0.0,
          z : velState.angularVel
      }
      });

    console.log('published cmdVel: ', velMsg)
    navigator.vibrate(100);
    // console.log('twist ', twist)
    setTwist(velMsg)
    cmdVel.publish(velMsg)

          // cmdVel.publish(twist);

    }, [vel]);

    // useEffect(() => {
    //   console.log('cjecek ', cmdVel)
    //   cmdVel.publish(twist)
    // }, [twist]);



    const handleJoystickMove = (evt, data) => {
        setData(data);
        // set()
        console.log('data: ',data)
        const direction = data.direction.angle
        console.log('onmove direction: ', direction)

        if (direction){
          if (direction === 'up'){
            console.log('up')
            setVel({
              linearVel: vel.linearVel + LIN_VEL_STEP_SIZE,
              angularVel: vel.angularVel
            })
            console.log('up vel: after', vel);
          }
          else if (direction === 'left'){
            console.log('left')
            setVel({
              // linearVel: vel.linearVel,
              linearVel: vel.linearVel,
              angularVel: vel.angularVel + ANG_VEL_STEP_SIZE
            })
            console.log('left vel: after', vel);
          }
          else if (direction === 'down'){
            console.log('down')
            setVel({
              linearVel: 0.0,
              angularVel: 0.0
            })
            console.log('down vel: after', vel);
          }
          else if (direction === 'right'){
            console.log('right')
            setVel({
              // linearVel: vel.linearVel,
              linearVel: vel.linearVel,
              angularVel: vel.angularVel - ANG_VEL_STEP_SIZE
            })
            console.log('right vel: after', vel);
          }
          else {
            console.log('else cond')
          }
        }

        // console.log('onmove twist: ', twist)
        // var linearVel = 0
        // var angularVel = 0
        // var twistMsg = new ROSLIB.Message({
        //   linear : {
        //       x : linearVel,
        //       y : 0.0,
        //       z : 0.0
        //   },
        //   angular : {
        //       x : 0.0,
        //       y : 0.0,
        //       z : angularVel
        //   }
        //   });

        // var velState = vel
        // switch (direction) {
        //   case 'up':
        //     // twist.linear.x = linearVel + LIN_VEL_STEP_SIZE;
        //     // var up_linear = vel.linearVel + LIN_VEL_STEP_SIZE;
        //     // // setTwist(twistMsg)
        //     // // console.log('twistMsg', twistMsg);
        //     // console.log('lin vel', vel.linearVel);
        //     // console.log('lin uo', up_linear);
        //     setVel({
        //       linearVel: vel.linearVel + LIN_VEL_STEP_SIZE,
        //       angularVel: vel.angularVel
        //     })
        //     console.log('up vel: after', vel);
        //     // cmdVelState.publish(twistMsg);
        //   case 'down':
        //     // twistMsg.linear.x = 0.0;
        //     // twistMsg.angular.z = 0.0;
        //     // velState.linearVel = 0.0;
        //     // velState.angularVel = 0.0;
        //     setVel({
        //       linearVel: 0.0,
        //       angularVel: 0.0
        //     })
        //     console.log('down vel: after', vel);
        //     // setTwist(twistMsg)
        //     // console.log('twistMsg', twistMsg);
        //     // console.log('twist', twist);
        //   case 'left':
        //     // twistMsg.angular.z = angularVel + ANG_VEL_STEP_SIZE;
        //     // velState.angularVel = velState.angularVel + ANG_VEL_STEP_SIZE;
        //     // console.log('ang vel', velState.angularVel);
        //     setVel({
        //       // linearVel: vel.linearVel,
        //       linearVel: vel.linearVel,
        //       angularVel: vel.angularVel + ANG_VEL_STEP_SIZE
        //     })
        //     console.log('left vel: after', vel);
        //     // console.log('Mangoes and papayas are $2.79 a pound.');
        //     // setTwist(twistMsg)
        //     // console.log('twistMsg', twistMsg);
        //     // console.log('twist', twist);
        //   case 'right':
        //     // twistMsg.angular.z = angularVel - ANG_VEL_STEP_SIZE
        //     // velState.angularVel = velState.angularVel - ANG_VEL_STEP_SIZE;
        //     // setTwist(twistMsg)
        //     setVel({
        //       // linearVel: vel.linearVel,
        //       linearVel: vel.linearVel,
        //       angularVel: vel.angularVel - ANG_VEL_STEP_SIZE
        //     })
        //     console.log('right vel: after', vel);
        //     // console.log('twistMsg', twistMsg);
        //     // console.log('twist', twist);
        //   // default:
        //   //   // twistMsg.linear.x = 0.0;
        //   //   // twistMsg.angular.z = 0.0;
        //   //   // velState.linearVel = 0.0;
        //   //   // velState.angularVel = 0.0;
        //   //   setVel({
        //   //     linearVel: 0.0,
        //   //     angularVel: 0.0
        //   //   })
            
        //     // setVel(velState)
        //     // setTwist(twistMsg)
        //     // console.log('twistMsg', twistMsg);
        //     // console.log('twist', twist);
        // }
        // console.log('velState', vel);
        // setVel(velState)
        // console.log(twist);
        console.log('-------------------');
        // setTwist(twistMsg)
        // cmdVelState.publish(twist);
    
      };

      const waitTime = 100;
      const debouncedJoystickMove = useMemo(
        () => debounce(handleJoystickMove, waitTime)
      , [vel]);

// ros version






  // functions
  const handleJoystickStart = (evt, data) => {
    setData(data);
  };

  const handleJoystickEnd = (evt, data) => {

    setData(data);
    
    // setState({
    //   axes: [0, 0, 0, 0, 0, 0]
    // });

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

    // setState({
    //   axes: [x, y, 0, 0, 0, 0],
    //   buttons: [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    // });
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

  var cmdVelMsg = JSON.stringify(twist, null, 3) 

  return (
      <ROS>
      {/* <Container> */}
      {/* <div className="joystick-wrapper mt-5"> */}
      {/* <DebugView data={data} /> */}
      {/* <Grid2> */}
      <div style={{zIndex:1, fontSize: '1vh'}} ><pre >{ cmdVelMsg }</pre></div>
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
            height: '100%',
            position: 'relative'
          }}
          onStart={handleJoystickStart}
          onEnd={handleJoystickEnd}
          // onMove={handleJoystickMove}
          onMove={debouncedJoystickMove}
          onDir={handleJoystickDir}
          onPlain={handleJoystickPlain}
          onShown={handleJoystickShown}
          onHidden={handleJoystickHidden}
          onPressure={handleJoystickPressure}
        />
        {/* <div style={{zIndex:1, fontSize: '1vh'}} ><pre >{ cmdVelMsg }</pre></div> */}
        {/* <Paper style={{maxHeight: '90%', overflow: 'auto'}}>
          <div>
            <pre>{ cmdVelMsg }</pre>
          </div>
        </Paper> */}
        {/* </Grid2> */}
      </ROS>
  );
}

export default Joystick;