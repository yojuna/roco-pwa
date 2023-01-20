import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import ROSLIB from 'roslib'
import {ngrok_uri} from '@/config'

const ssl_url = 'wss://' + ngrok_uri

const rosObj = {
  ROS: new ROSLIB.Ros({url: ssl_url}),
  url: ssl_url,
  isConnected: false,
  ROSConfirmedConnected: false,
  autoconnect: false,
  topics: [],
  services:[],
  listeners: [],
}

const ROSContext = createContext([{}, () => {}]);

const ROSProvider = (props) => {
  const [ ros, setROS ] = useState(rosObj);
  return (
    <ROSContext.Provider value={[ros, setROS]}>
      {props.children}
    </ROSContext.Provider>
  );
}

ROSProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ROSContext, ROSProvider };
