import { ngrok_uri } from '@/config';
import { Box, Button, Container } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react'
import Paper from '@mui/material/Paper';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { ROS, useROS } from '../ROS'
import Typography from '@mui/material/Typography';
import { CoPresent } from '@mui/icons-material';
import { color } from '@mui/system';
import { ROSContext, ROSProvider } from '../ROSContext'
import ROSLIB from 'roslib';
import TextField from '@mui/material/TextField';

function ToggleConnect() {
  // const [rosCont, setROSCont] = useContext(ROSContext);
  // const [rosState, setROSState] = useState(rosCont);
  const [ ros, setROS ] = useContext(ROSContext);
  const [ topic, setTopic ] = useState('/');
  const { isConnected, topics, url, checkConnection, getTopics, getServices, createListener, changeUrl, toggleConnection, toggleAutoconnect} = useROS();

  // console.log('initial log',rosCont)
  // console.log('initial log',rosState)
  // Try replacing this with your own unique rosbridge webserver address
  const defaultURL = "wss://"+ngrok_uri;

  useEffect(() => {
    toggleConnection()
    checkConnection()
    // connectROS(ros)
    // handleConnect()
    getTopics();
    

    // ros.ROS.connect(ros.url)
    // ros.ROS.on('connection', () => {
    //   // console.log(connect)
    //   setROS(ros => ({ ...ros, isConnected: true }));  // seems to take awhile for the roslibjs library to report connected
    //   setROS(ros => ({ ...ros, ROSConfirmedConnected: false }));
    //   getTopics();
    //   getServices();
    // })

    // console.log('ToggleConnect is mounted!');
    // if (url !== defaultURL) {
    //   console.log('changin url to: ', defaultURL);
    //   changeUrl(defaultURL);
    // }

    // if (!isConnected) {
    //   // console.log('toggling autoconnect: ros: ', ros);
    //   toggleAutoconnect();
    //   console.log('toggled autoconnect: ros: ', ros);
    // }
    return () => {
      if (isConnected) {
        toggleConnection()
      }
      
    };
    
  },[])

  // console.log('toggled autoconnect: ros: ', ros);

  
	
  // const connectROS = (ros) => {
  //   ros.ROS.connect(ros.url)
  //   ros.ROS.on('connection', () => {
  //     setROS(ros => ({ ...ros})); 
  //     setROS(ros => ({ ...ros, isConnected: ros.ROS.isConnected }));  // seems to take awhile for the roslibjs library to report connected
  //     setROS(ros => ({ ...ros, ROSConfirmedConnected: false }));
  //     // console.log('connected at toggleconnect.jsx; ros: ', ros.ROS.isConnected, ros)
  //   })
  // }

  var rosObjJSON = JSON.stringify(ros, null, 4);
  // // only runs once when ToggleConnect is first rendered (mounted)
  // useEffect(() => {
  //   var new_ros = new ROSLIB.Ros({ url : defaultURL });


  //   new_ros.connect(defaultURL)

  // new_ros.on('connection', () => {
  //   console.log('cpnnectedLLLL:::::', new_ros)
  //   setROS(ros => ({ ...ros, isConnected: true }));  // seems to take awhile for the roslibjs library to report connected
  //   setROS(ros => ({ ...ros, ROSConfirmedConnected: false }));
  //   getTopics();
  //   // getServices();
  // })
  //   setROS(ros => ({ ROS: new_ros, ...ros }))

  //   console.log('new comp ros: ',new_ros)
  //   console.log('topics: ',topics)
  //   console.log('context ros: ', ros)
  //   // handleTopic(topic);
  //   // console.log('ToggleConnect is mounted!');
  //   // if (url !== defaultURL) {
  //   //   changeUrl(defaultURL);
  //   // }

  //   // if (!isConnected) {
  //   //   console.log('toggling autoconnect...')
  //   //   toggleAutoconnect();
  //   // }
  // },[])
 

  // ros.ROS.connect(ros.url)
  // ros.ROS.on('connection', () => {
  //   // console.log(connect)
  //   setROS(ros => ({ ...ros, isConnected: true }));  // seems to take awhile for the roslibjs library to report connected
  //   setROS(ros => ({ ...ros, ROSConfirmedConnected: false }));
  //   getTopics();
  //   getServices();
  // })


  // runs every time there is an update to any state/rerender
//   useEffect(() => {
//     console.log('rerender ToggleConnect');
//     toggleAutoconnect();
//   })


  // const unsubscribe = () => {
  //   if (listener) {
  //     console.log("Unsubscribing");
  //     listener.unsubscribe();
  //   }
  // }

  // const handleTopic = (topicInput) => {
  //   if (topic !== topicInput) {
  //     setTopic(topicInput);
  //     unsubscribe();
  //     return;
  //   }

  //   unsubscribe();
  //   listener = null;

  //   for (var i in topics) {
  //     if (topics[i].path == topicInput) {
  //       console.log('topic found: ', topics[i].path )
  //       listener = createListener( topics[i].path,
  //                                  topics[i].msgType,
  //                                  Number(queue),
  //                                  compression);
  //       break;
  //     }
  //   }

  //   if (listener) {
  //     console.log("Subscribing to messages...");
  //     listener.subscribe(handleMsg);
  //   } else {
  //     console.log("Topic >> '" + topic + "' not found...");
  //   }
  // }

  // const handleQueue = (queueInput) => {
  //   setQueue(queueInput);
  // }

  // const handleCompression = (compInput) => {
  //   setCompression(compInput);
  // }

  // const handleMsg = (msg) => {
  //   console.log(msg);
  // }

  return (

  <ROS>
    {/* <FullSizeCenteredFlexBox> */}
      <Container>

          <Container>
              {/* <Typography variant="h5">ROS URL: </Typography> */}
              <TextField
                id="outlined-helperText"
                label="Connect To ROS"
                defaultValue={ defaultURL }
                helperText="ROSBridge Ngrok URL"
                onChange={event => changeUrl(event.target.value)}
              />
              {/* <input name="urlInput" defaultValue={ defaultURL } onChange={event => changeUrl(event.target.value)} /> <br /> */}
              {/* <b>ROS url to connect to: {'>'}  </b>
                  <div>
                      <pre>{url}</pre>
                  </div>
              <br /> */}
          </Container>
          <Container>
            {/* <Typography variant="h4">ROS CONNECT</Typography> */}
              <Button onClick={ toggleConnection } variant="contained">CONNECT</Button>
              <Typography variant="subtitle1">status: { isConnected ? "connected" : "not_connected" }</Typography>
          </Container>
          {/* <Box> */}
          {/* <Typography variant="subtitle1">status: { isConnected ? "connected" : "not_connected" }</Typography> */}
              {/* <Typography variant="subtitle1">ROS Status: </Typography>
              <div>
                <pre>{ isConnected ? "connected" : "not connected" }</pre>
              </div> */}
          {/* </Box> */}
          <Container>
            <Typography variant="subtitle1">ROS Object: </Typography>
            <Paper style={{maxHeight: '30vh', overflow: 'auto'}}>
              <div><pre>
                {rosObjJSON}
              </pre></div>
            </Paper>
          </Container>
      </Container>
    {/* </FullSizeCenteredFlexBox> */}
  </ROS>
  );
}

export default ToggleConnect;
