import { ngrok_uri } from '@/config';
import { Container } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react'
import { ROS, useROS } from '../ROS'
import Typography from '@mui/material/Typography';
import { CoPresent } from '@mui/icons-material';
import { color } from '@mui/system';
import { ROSContext, ROSProvider } from '../ROSContext'
import ROSLIB from 'roslib';

function ToggleConnect() {
  // const [rosCont, setROSCont] = useContext(ROSContext);
  // const [rosState, setROSState] = useState(rosCont);
  // const [ topic, setTopic ] = useState('/');
  // const { isConnected, topics, url, createListener, changeUrl, toggleConnection, toggleAutoconnect} = useROS();

  console.log('initial log',rosCont)
  console.log('initial log',rosState)
  // Try replacing this with your own unique rosbridge webserver address
  const defaultURL = "wss://"+ngrok_uri;

  var listener = null
	
  // only runs once when ToggleConnect is first rendered (mounted)
  useEffect(() => {
    toggleConnection()
    

    var new_ros = new ROSLIB.Ros({ url : defaultURL });
    // setROSState(ros => ({ ...ros, ros: new_ros }))

    console.log('new comp ros: ',new_ros)
    // console.log('context ros: ',ros)
    handleTopic(topic);
    console.log('ToggleConnect is mounted!');
    if (url !== defaultURL) {
      changeUrl(defaultURL);
    }

    if (!isConnected) {
      console.log('toggling autoconnect...')
      toggleAutoconnect();
    }
  },[])
    
  // runs every time there is an update to any state/rerender
//   useEffect(() => {
//     console.log('rerender ToggleConnect');
//     toggleAutoconnect();
//   })


  const unsubscribe = () => {
    if (listener) {
      console.log("Unsubscribing");
      listener.unsubscribe();
    }
  }

  const handleTopic = (topicInput) => {
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
      console.log("Topic >> '" + topic + "' not found...");
    }
  }

  const handleQueue = (queueInput) => {
    setQueue(queueInput);
  }

  const handleCompression = (compInput) => {
    setCompression(compInput);
  }

  const handleMsg = (msg) => {
    console.log(msg);
  }






  return (

    <ROS>

    <Container>
        <Typography variant="h3">ROS CONNECT</Typography>
        <button onClick={ toggleConnection }>Toggle Connect</button>
        <Container>
            <Typography variant="h5">ROS URL input: </Typography>
            <input name="urlInput" defaultValue={ defaultURL } onChange={event => changeUrl(event.target.value)} /> <br />
            <b>ROS url to connect to:  </b>
                <div>
                    <p>{url}</p>
                </div>
            <br />  
        </Container>
        <Container>
            <Typography variant="h5">ROS Status: </Typography>
            <div>
                { isConnected ? "connected" : "not connected" }   <br />
            </div>
        </Container>
        <Container>
            <Typography variant="h5">Topics detected:</Typography>
            <Container>
               <p> { topics ? topics.map((topic, i) => <li key={i}>    {topic.path}</li> ) : console.log('no topics found')} </p>
            </Container>
        </Container>
        <Container>
            <Typography variant="h5">Topic to echo:</Typography>
            <input name="topicInput" defaultValue={ topic } onChange={event => handleTopic(event.target.value)} />
        </Container>
    </Container>

    </ROS>
  );
}

export default ToggleConnect;
