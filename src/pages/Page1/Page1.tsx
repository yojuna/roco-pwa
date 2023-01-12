import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

import React, { useState, useEffect } from 'react'
import ROSLIB from 'roslib'
import { Joystick } from 'react-joystick-component';
// import ROS3D from '../../lib/ROS/ros3d'
// import * as ROS3D from '../../lib/ROS/ros3d.js'
// import * as ROS2D from 'ros2d'
// var ROS2D = require('ros2d');
// import useScript from '../../hooks/importScript'
// import ScriptTag from 'react-script-tag';
// import { appendScript, removeScript } from '../../hooks/importScript'
// import {removeScript} from 'utils/removeScript'
import { useROS } from '@/components/ROS'
import { ngrok_uri } from '@/config'
import Nav2D from '@/components/ROS/nav2d'

var listener: any = null;
// import 'ros3d';

function Page1() {
  const { createListener, topics } = useROS();
  const [ topic, setTopic ] = useState('/');
  const [ queue, setQueue ] = useState(0);
  const [ compression, setCompression ] = useState('none');

  useEffect(() => {
    handleTopic(topic);
  });

  const unsubscribe = () => {
    if (listener) {
      console.log("Unsubscribing");
      listener.unsubscribe();
    }
  }

  const handleTopic = (topicInput: string) => {
    if (topic !== topicInput) {
      setTopic(topicInput);
      unsubscribe();
      return;
    }

    unsubscribe();
    listener = null;

    for (var i in topics) {
      if (topics[i].path == topicInput) {
        listener = createListener( topics[i].path,
                                   topics[i].msgType,
                                   Number(queue),
                                   compression);
        break;
      }
    }

    if (listener) {
      console.log("Subscribing to messages...");
      listener.subscribe(handleMsg);
    } else {
      console.log("Topic '" + topic + "' not found...make sure to input the full topic path - including the leading '/'");
    }
  }

  const handleQueue = (queueInput: any) => {
    setQueue(queueInput);
  }

  const handleCompression = (compInput: any) => {
    setCompression(compInput);
  }

  const handleMsg = (msg: string) => {
    console.log(msg);
  }

  // // const ROS3DImport = props => (
  // //   <ScriptTag type="text/javascript" src="/path/to/resource.js" />
  // //   )


  // class ROS3DImportComponent extends React.Component {
  //   componentDidMount () {
  //       appendScript('../../lib/ROS/ros3d.js');
  //   }
  //   componentDidUnmount () {
  //       removeScript('../../lib/ROS/ros3d.js')
  //   }
  //   }


  // // const ROS3DImport = props => {
  // //   importScript('../../lib/ROS/ros3d.js');
  // //   console.log('loaded script')
  // // }



  // // function ImportROS3D() {
  // //   useScript(
  // //     '../../lib/ROS/ros3d.min.js'
  // //   )
  // //   return <div className="importROS3D"></div>
  // // }
  

  // // var ssl_ngrok_url = '0e60-2001-4dd5-aa75-0-90b2-6d9b-8816-d559.eu.ngrok.io';
  // // Connect to ROS.
  // var ros = new ROSLIB.Ros({
  //   url : 'wss://' + ngrok_uri
  // });

  // // Create the main viewer.
  
  
  // let NodeROS3D = new ROS3D();

  // var viewer = NodeROS3D.Viewer({
  //   divID : 'map',
  //   width : 966,
  //   height : 1300,
  //   antialias : true
  // });

  // // Setup the map client.
  // var gridClient = new ROS3D.OccupancyGridClient({
  //   ros : ros,
  //   rootObject : viewer.scene,
  //   continuous: true
  // });  

  return (
    <>
      <FullSizeCenteredFlexBox>
        <Typography variant="h5">ROS CONNECT</Typography>
        <br></br>
        <Typography variant="h5">Message Queue Length:</Typography>
        <input name="queueInput" defaultValue={ queue } onChange={event => handleQueue(event.target.value)} />
        <br></br>
        <Typography variant="h5">Compression:</Typography>
        <input name="compInput" defaultValue={ compression } onChange={event => handleCompression(event.target.value)} />
        <br></br>
        <Typography variant="h5">Topic to echo:</Typography>
        <input name="topicInput" defaultValue={ topic } onChange={event => handleTopic(event.target.value)} />
        <br></br>
        <Nav2D id='random' width={750} height={800} serverName='/map'/>
        {/* <Joystick start={console.log('starting')} move={console.log('moving')}
                                                        stop={console.log('stopping')}/> */}
      </FullSizeCenteredFlexBox>
    </>

    // <div>
    //   <b>Message Queue Length:  </b><input name="queueInput" defaultValue={ queue } onChange={event => handleQueue(event.target.value)} />  <br />
    //   <b>Compression:  </b><input name="compInput" defaultValue={ compression } onChange={event => handleCompression(event.target.value)} />  <br />
    //   <b>Topic to echo:  </b><input name="topicInput" defaultValue={ topic } onChange={event => handleTopic(event.target.value)} />  <br />
    // </div>
  );
}

export default Page1;
