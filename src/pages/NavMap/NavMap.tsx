import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';
// import Item from '@mui/material/Item'

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox, CenteredFlexBox } from '@/components/styled';
import React, { useState, useEffect } from 'react'
import { Joystick } from 'react-joystick-component';
import { useROS } from '@/components/ROS'
import Nav2D from '@/components/ROS/nav2d'
import { Container, width } from '@mui/system';

var listener: any = null;

function NavMap() {
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
      console.log("Topic >> '" + topic + "' not found...");
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

  const handleStart = () => {
    console.log('started'); 
  }

  const handleMove = () => {
    console.log('moved'); 
  }

  const handleStop = () => {
    console.log('stopped'); 
  }



  return (
    <>
      <Meta title="Nav Map" />
      <FullSizeCenteredFlexBox>
        <Nav2D id='OGMMap' width={300} height={300} serverName='/map'/>
        <Grid2 container spacing={2} disableEqualOverflow>
          <Grid2 xs={12}>
            <Typography variant="h4">ROS CONNECT</Typography>
            <br></br>
            <Typography variant="h6">Message Queue Length:</Typography>
            <input name="queueInput" defaultValue={ queue } onChange={event => handleQueue(event.target.value)} />
            <br></br>
            <Typography variant="h6">Compression:</Typography>
            <input name="compInput" defaultValue={ compression } onChange={event => handleCompression(event.target.value)} />
            <br></br>
            <Typography variant="h6">Topic to echo:</Typography>
            <input name="topicInput" defaultValue={ topic } onChange={event => handleTopic(event.target.value)} />
          </Grid2>
          <Grid2 xs={12}>
            <Container>
              <Nav2D id='OGMMap' width={300} height={300} serverName='/map'/>
            </Container>
            <Container>
              <Joystick start={handleStart} move={handleMove} stop={handleStop}/>
            </Container>

          </Grid2>
        </Grid2>

      </FullSizeCenteredFlexBox>
    </>

      // <Typography variant="h5">ROS CONNECT</Typography>
      //   <br></br>
      //   <Typography variant="h5">Message Queue Length:</Typography>
      //   <input name="queueInput" defaultValue={ queue } onChange={event => handleQueue(event.target.value)} />
      //   <br></br>
      //   <Typography variant="h5">Compression:</Typography>
      //   <input name="compInput" defaultValue={ compression } onChange={event => handleCompression(event.target.value)} />
      //   <br></br>
      //   <Typography variant="h5">Topic to echo:</Typography>
      //   <input name="topicInput" defaultValue={ topic } onChange={event => handleTopic(event.target.value)} />
      //   <br></br>
      //   <Nav2D id='random' width={750} height={800} serverName='/map'/>
      //   <Joystick start={handleStart} move={handleMove} stop={handleStop}/>





    // <div>
    //   <b>Message Queue Length:  </b><input name="queueInput" defaultValue={ queue } onChange={event => handleQueue(event.target.value)} />  <br />
    //   <b>Compression:  </b><input name="compInput" defaultValue={ compression } onChange={event => handleCompression(event.target.value)} />  <br />
    //   <b>Topic to echo:  </b><input name="topicInput" defaultValue={ topic } onChange={event => handleTopic(event.target.value)} />  <br />
    // </div>
  );
}

export default NavMap;
