import React, { useState, useEffect } from 'react'
import { ROS, useROS } from '../ROS'
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import { height } from '@mui/system';

var listener = null;

function TopicsList() {
  const { createListener, topics, isConnected } = useROS();
  const [ topic, setTopic ] = useState('/');
  const [ topicMsg, setTopicMsg ] = useState('{}');
  const [ queue, setQueue ] = useState(0);
  const [ compression, setCompression ] = useState('none');

  useEffect(() => {
    handleTopic(topic);
    // console.log(isConnected)
    // console.log(topics)
  });

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
    // console.log('in topicslist, topics: ',topics)
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
      setTopicMsg(JSON.stringify('topic: ' + topic + ' not found'));
    }
  }

  const handleQueue = (queueInput) => {
    setQueue(queueInput);
  }

  const handleCompression = (compInput) => {
    setCompression(compInput);
  }

  var topicNotFoundMsg = JSON.stringify('topic: { ' + topic + ' } not found')
  const handleMsg = (msg) => {
    // console.log('\ntopic: ', topic, '\nmsg: ', JSON.stringify(msg));
    setTopicMsg(JSON.stringify(msg, null, 4));
  }

  return (
    <ROS>
    <Container>
        <Container>
            <Typography variant="h5">ROS STATUS: </Typography>
            <div>
                { isConnected ? "connected" : "not connected" }   <br />
            </div>
        </Container>
        <Container>
            <Typography variant="h5">Topics DETECTED:</Typography>
            <Container>
            <Paper style={{maxHeight: 400, overflow: 'auto'}}>
              <Typography variant="body1">
                { topics ? topics.map((topic, i) => <li key={i}> {topic.path}</li> ) : topic+' not found' }
              </Typography>
            </Paper>
            </Container>
        </Container>
        <Container>
          <div>
            <b>Message Queue Length:  </b><input name="queueInput" defaultValue={ queue } onChange={event => handleQueue(event.target.value)} />  <br />
            <b>Compression:  </b><input name="compInput" defaultValue={ compression } onChange={event => handleCompression(event.target.value)} />  <br />
            <b>Topic to echo:  </b><input name="topicInput" defaultValue={ topic } onChange={event => handleTopic(event.target.value)} />  <br />
          </div>
        </Container>
        <Paper style={{maxHeight: 400, overflow: 'auto'}}>
          <div>
            <pre>{ topicMsg }</pre>
          </div>
          {/* <Typography variant="body1">{ topicMsg }</Typography> */}
              {/* <Typography variant="body1">
                { topics ? topics.map((topic, i) => <li key={i}> {topic.path}</li> ) : topic+' not found' }
              </Typography> */}
        </Paper>
        
    </Container>

    </ROS>
  );
}

export default TopicsList;
