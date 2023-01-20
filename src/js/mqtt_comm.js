// // this works for localhost development
// var host = 'wss://192.168.0.7:8881/'
// const config = require('../app_config');
import config from '../pwa/app_config.js'

const current_env = config['current_env'];

const httpPort = config['networking'][current_env]['http_port']
const httpsPort = config['networking'][current_env]['https_port']
const wifi_ip = config['networking']['wifi_ip']

// var host = 'wss://localhost:8881/ws/'

// this works for localhost development
// var host = 'wss://192.168.0.7:8881/'

// var host = 'wss://134.61.163.174:8881/'
// var host = 'wss://a5b9-2001-4dd5-aa75-0-e86e-5205-7569-a842.eu.ngrok.io'
// var topic = "test_topic"
var status = "STATE_ZERO"
// https://192.168.0.7:8082/

// connection to MQTT Broker
function startConnect() {
  console.log('startConnect() started')

  var clientID = "clientID-" + parseInt(Math.random() * 100);
  const options = {
    keepalive: 60,
    clientId: clientID,
    rejectUnauthorized: false,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 1,
      retain: false
    },
  }

  // Fetch the hostname/IP address and port number from the form
  // var host = document.getElementById("host").value;
  // var port = document.getElementById("port").value;

  var host = config['networking']['websocket']['wss_host']
  var port = config['networking']['websocket']['wss_port']
  document.getElementById("host").value = host;
  document.getElementById("port").value = port;
  // var uri = 'wss://'+host+':'+port
  var uri = 'wss://' + host + ':' + port
  var topic = document.getElementById("topic").value;

  console.log('uri: ', uri)
  // Print output for the user in the messages div
  document.getElementById("messages").innerHTML += '<span>Connecting to: ' + uri + '</span><br/>';
  document.getElementById("messages").innerHTML += '<span>Client ID: ' + clientID + '</span><br/>';
  console.log('Connecting...')

  // MQTT Broker Connection
  var client = mqtt.connect(uri, options)

  // On Connection
  client.on('connect', () => {
    console.log('Connected Client :' + clientID)
    document.getElementById("clientid").innerHTML = clientID;

    // Subscribe
    client.subscribe(topic, { qos: 2 })
    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';
  })

  // On Received Message
  client.on('message', (topic, message, packet) => {
    // console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
    // document.getElementById("ros_topic").innerHTML = topic;
    // document.getElementById("ros_msg").innerHTML = message.toString();
    // document.getElementById("status").innerHTML = status;
    // console.log("onMessageArrived: " + message.toString());
    // document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
    var parsed_msg =  '<span> [ SUB ] [  TOPIC |  ' + topic + '  ]  [  MSG |  ' + message.toString() + '  ]</span><br/>'
    document.getElementById("messages").innerHTML += parsed_msg;

  })

  // Error
  client.on('error', (err) => {
    console.log('Connection ERROR: ', err)
    client.end()
    document.getElementById("messages").innerHTML += '<span>ERROR: CONNECTION LOST with ' + clientID + '</span><br/>';
    if (res.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + + res.errorMessage + '</span><br/>';
    }
  })

  client.on('reconnect', () => {
    console.log('Reconnecting...')
    status = "RECONNECTING"
    document.getElementById("messages").innerHTML = '<span>STATUS: Reconnecting...</span><br/>';
  })
}

// Publisher to MQTT Broker
function startPublish() {
  console.log('startPublish() started')

  var clientID = "publisher_client_ID_" + parseInt(Math.random() * 100);
  const options = {
    keepalive: 60,
    clientId: clientID,
    rejectUnauthorized: false,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 1,
      retain: false
    },
  }

  var host = config['networking']['websocket']['wss_host']
  var port = config['networking']['websocket']['wss_port']
  document.getElementById("host").value = host;
  document.getElementById("port").value = port;
  // var uri = 'wss://'+host+':'+port
  var uri = 'wss://' + host + ':' + port
  var topic = document.getElementById("topic_pub").value;


  //
  // // Fetch the hostname/IP address and port number from the form
  // var host = document.getElementById("host").value;
  // var port = document.getElementById("port").value;
  // var uri = 'wss://'+host+':'+port
  // var topic = document.getElementById("topic_pub").value;

  console.log('uri: ', uri)
  // Print output for the user in the messages div
  document.getElementById("pub_msg_log").innerHTML += '<span>Connecting to: ' + uri + '</span><br/>';
  document.getElementById("pub_msg_log").innerHTML += '<span>Client ID: ' + clientID + '</span><br/>';
  console.log('Connecting...')

  // MQTT Broker Connection
  var client = mqtt.connect(uri, options)

  // On Connection
  client.on('connect', () => {
    console.log('Connected Client :' + clientID)
    document.getElementById("clientid").innerHTML = clientID;
    var message = document.getElementById("payload").value;
    // Subscribe
    client.publish(topic, message, { qos: 2 })
    // Print output for the user in the messages div
    console.log('PUB :' + message)
    document.getElementById("pub_msg_log").innerHTML += '<span> [ PUB ] [ TOPIC | ' + topic + ' ]  [ MSG |' + message +' ] </span><br/>';
  })

  // On Received Message
  client.on('message', (topic, message, packet) => {
    var parsed_msg =  '<span> [ SUB ] [ TOPIC |  ' + topic + ' ]  [ MSG |  ' + message.toString() + '  ]</span><br/>'
    document.getElementById("pub_msg_log").innerHTML += parsed_msg;
  })

  // Error
  client.on('error', (err) => {
    console.log('Connection ERROR: ', err)
    client.end()
    document.getElementById("pub_msg_log").innerHTML += '<span>ERROR: CONNECTION LOST with ' + clientID + '</span><br/>';
    if (res.errorCode !== 0) {
        document.getElementById("pub_msg_log").innerHTML += '<span>ERROR: ' + + res.errorMessage + '</span><br/>';
    }
  })

  client.on('reconnect', () => {
    console.log('Reconnecting...')
    status = "RECONNECTING"
    document.getElementById("pub_msg_log").innerHTML = '<span>STATUS: Reconnecting...</span><br/>';
  })
}


// Called when the disconnection button is pressed
function startDisconnect() {
  client.on('disconnect', () => {
      client.end();
      console.log('Disconnected.')
      document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
  })
}

var btn = document.getElementById("connectBtn");
btn.addEventListener('click', event => {
    startConnect();
  });

var btn = document.getElementById("disconnectBtn");
btn.addEventListener('click', event => {
    startDisconnect();
  });

var btn = document.getElementById("publishBtn");
btn.addEventListener('click', event => {
    startPublish();
  });


// // import nipplejs from 'nipplejs';
// // create joystick for robot control
// function createJoystick() {
//     var options = {
//     zone: document.getElementById('zone_joystick'),
//     threshold: 0.1,
//     position: { left: 50 + '%' },
//     mode: 'static',
//     size: 150,
//     color: '#000000',
//     };
//     var manager = nipplejs.create(options);
//
//     const linear_speed = 0;
//     const angular_speed = 0;
//
//     manager.on('start', function (event, nipple) {
//     console.log("Movement start");
//     });
//
//     manager.on('move', function (event, nipple) {
//     console.log("Moving");
//     });
//
//     manager.on('end', function () {
//     console.log("Movement end");
//     });
// }
// window.onload = function () {
//     createJoystick();
// }
