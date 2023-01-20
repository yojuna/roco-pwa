// import config from '../pwa/app_config.js'

//
// var os = require('os');
// var networkInterfaces = os.networkInterfaces();
// var wifi_ip = networkInterfaces['wlo1']['0']['address']
const config = {
  current_env: 'local',
  crypto: {
    key_path: './certs/localhost-key.pem',
    cert_path: './certs/localhost.pem'
  },
  networking: {
    websocket: {
      // wss_host: wifi_ip,
      wss_host: "192.168.0.7",
      // wss_host: "10.10.10.239",
      wss_port: "8881"
    }
  },
  topics: {
    publisher: 'mqtt_to_ros',
    subscriber: 'ros_to_mqtt'
  }
};




////

// const current_env = config['current_env'];

// const httpPort = config['networking'][current_env]['http_port']
// const httpsPort = config['networking'][current_env]['https_port']
// const wifi_ip = config['networking']['wifi_ip']



var streaming = false;
var video = null;
// var slider = $('.slider_1');
// var myCollapseEl = document.getElementById('myCollapse')

function startup() {

  video = document.getElementById('video');
  const constraints = {
    // audio: false,
    video: true,
    video: {
      facingMode: "environment",
      width: screen.height,
      height: screen.width
      // facingMode: "user",
      // width: { min: 640, ideal: 1280, max: 1920 },
      // height: { min: 480, ideal: 720, max: 1080 }
    }

    // Other useful props:
    // width: 1280, height: 720  -- preference only
    // facingMode: {exact: "user"} // forcing to be user camera
    // facingMode: "environment"
  };

  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    video.srcObject = stream;
    video.play();
  })
  .catch(function(err) {
    console.log("An error occurred: " + err);
  });

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      streaming = true;
    }
  }, false);
}

window.addEventListener('load', startup, false);


// mqtt
var clientID = "clientID-new-" + parseInt(Math.random() * 100);
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
var uri = 'wss://'+host+':'+port
// var uri = 'wss://192.168.1.81:8881/'
// var topic = 'mqtt_to_ros'
var topic = config['topics']['publisher']
var client = mqtt.connect(uri, options)
// On Connection
client.on('connect', () => {

  // Print output for the user in the messages div
  console.log("connected")
  // document.getElementById("pub_msg_log").innerHTML += '<span> [ PUB ] [ TOPIC | ' + topic + ' ]  [ MSG |' + message +' ] </span><br/>';
})


  // client.publish(topic, message, { qos: 2 })


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const vibration_duration = 600
const vibration_duration_step = 50

var slider1 = document.getElementById("slider_1");
var output1 = document.getElementById("slider_1_val");
var slider2 = document.getElementById("slider_2");
var output2 = document.getElementById("slider_2_val");
var slider3 = document.getElementById("slider_3");
var output3 = document.getElementById("slider_3_val");
var slider4 = document.getElementById("slider_4");
var output4 = document.getElementById("slider_4_val");
var slider5 = document.getElementById("slider_5");
var output5 = document.getElementById("slider_5_val");
var slider6 = document.getElementById("slider_6");
var output6 = document.getElementById("slider_6_val");

var jointValues = {};
jointValues['joint1'] = slider1.value;
jointValues['joint2'] = slider2.value;
jointValues['joint3'] = slider3.value;
jointValues['joint4'] = slider4.value;
jointValues['joint5'] = slider5.value;
jointValues['joint6'] = slider6.value;

var topic = "mqtt_to_ros"

  output1.innerHTML = slider1.value;
  slider1.oninput = function() {
    output1.innerHTML = slider1.value;
    navigator.vibrate(vibration_duration_step);
  }
  // Update the current slider value (each time you drag the slider handle)
  slider1.onchange = function() {
    // navigator.vibrate(vibration_duration);

    // update html element for real time values
    output1.innerHTML = this.value;
    // update joints dict with new slider value
    jointValues['joint1'] = this.value;
    // var topic = "mqtt_to_ros"
    // var message =  this.value;
    // stringify for mqtt and send full json dict
    var joints_dict =  JSON.stringify(jointValues);
    client.publish(topic, joints_dict, { qos: 1 })
    navigator.vibrate(vibration_duration);

    console.log("slider value: " + this.value);
    console.log(JSON.stringify(jointValues));

  }



  output2.innerHTML = slider2.value; // Display the default slider value
  // Update the current slider value (each time you drag the slider handle)
  slider2.onchange = function() {
    navigator.vibrate(vibration_duration);
    output2.innerHTML = this.value;
    console.log("slider value: " + this.value);

    // update joints dict with new slider value
    jointValues['joint2'] = this.value;
    // var topic = "mqtt_to_ros"
    // var message =  this.value;
    // stringify for mqtt and send full json dict
    var joints_dict =  JSON.stringify(jointValues);
    client.publish(topic, joints_dict, { qos: 2 })

    console.log(JSON.stringify(jointValues));

  }

  output3.innerHTML = slider3.value; // Display the default slider value
  // Update the current slider value (each time you drag the slider handle)
  slider3.onchange = function() {
    output3.innerHTML = this.value;
    console.log("slider value: " + this.value);
    navigator.vibrate(vibration_duration);

    // update joints dict with new slider value
    jointValues['joint3'] = this.value;
    // var topic = "mqtt_to_ros"
    // var message =  this.value;
    // stringify for mqtt and send full json dict
    var joints_dict =  JSON.stringify(jointValues);
    client.publish(topic, joints_dict, { qos: 2 })

    console.log(JSON.stringify(jointValues));

  }

  output4.innerHTML = slider4.value; // Display the default slider value
  // Update the current slider value (each time you drag the slider handle)
  slider4.onchange = function() {
    output4.innerHTML = this.value;
    console.log("slider value: " + this.value);
    navigator.vibrate(vibration_duration);
    // update joints dict with new slider value
    jointValues['joint4'] = this.value;
    // var topic = "mqtt_to_ros"
    // var message =  this.value;
    // stringify for mqtt and send full json dict
    var joints_dict =  JSON.stringify(jointValues);
    client.publish(topic, joints_dict, { qos: 2 })

    console.log(JSON.stringify(jointValues));

  }

  output5.innerHTML = slider5.value; // Display the default slider value
  // Update the current slider value (each time you drag the slider handle)
  slider5.onchange = function() {
    output5.innerHTML = this.value;
    console.log("slider value: " + this.value);
    navigator.vibrate(vibration_duration);
    // update joints dict with new slider value
    jointValues['joint5'] = this.value;
    // var topic = "mqtt_to_ros"
    // var message =  this.value;
    // stringify for mqtt and send full json dict
    var joints_dict =  JSON.stringify(jointValues);
    client.publish(topic, joints_dict, { qos: 2 })

    console.log(JSON.stringify(jointValues));

  }

  output6.innerHTML = slider6.value; // Display the default slider value
  // Update the current slider value (each time you drag the slider handle)
  slider6.onchange = function() {
    output6.innerHTML = this.value;
    console.log("slider value: " + this.value);
    navigator.vibrate(vibration_duration);
    // update joints dict with new slider value
    jointValues['joint6'] = this.value;
    // var topic = "mqtt_to_ros"
    // var message =  this.value;
    // stringify for mqtt and send full json dict
    var joints_dict =  JSON.stringify(jointValues);
    client.publish(topic, joints_dict, { qos: 2 })

    console.log(JSON.stringify(jointValues));


  }
// }




//
// var getSlider = function getSliderFunction() {
//   // output.innerHTML = this.value;
//   console.log("slider value: " + this.value);
//   navigator.vibrate(200);
// }
//
//
// var slider1 = document.getElementById("slider_1");
// var output1 = document.getElementById("slider_1_val");
// output1.innerHTML = slider1.value; // Display the default slider value
// // Update the current slider value (each time you drag the slider handle)
// slider1.oninput = function() {
//   output1.innerHTML = this.value;
//   console.log("slider value: " + this.value);
//   navigator.vibrate(500);
// }
//
// var slider2 = document.getElementById("slider_2");
// var output2 = document.getElementById("slider_2_val");
// output2.innerHTML = slider2.value; // Display the default slider value
// // Update the current slider value (each time you drag the slider handle)
// slider2.oninput = function() {
//   output2.innerHTML = this.value;
//   console.log("slider value: " + this.value);
//   navigator.vibrate(100);
// }
//
// var slider3 = document.getElementById("slider_3");
// var output3 = document.getElementById("slider_3_val");
// output3.innerHTML = slider3.value; // Display the default slider value
// // Update the current slider value (each time you drag the slider handle)
// slider3.oninput = function() {
//   output3.innerHTML = this.value;
//   console.log("slider value: " + this.value);
//   navigator.vibrate(200);
// }
//
// var slider4 = document.getElementById("slider_4");
// var output4 = document.getElementById("slider_4_val");
// output4.innerHTML = slider4.value; // Display the default slider value
// // Update the current slider value (each time you drag the slider handle)
// slider4.oninput = function() {
//   output4.innerHTML = this.value;
//   console.log("slider value: " + this.value);
//   navigator.vibrate(300);
// }
//
// var slider5 = document.getElementById("slider_5");
// var output5 = document.getElementById("slider_5_val");
// output5.innerHTML = slider5.value; // Display the default slider value
// // Update the current slider value (each time you drag the slider handle)
// slider5.oninput = function() {
//   output5.innerHTML = this.value;
//   console.log("slider value: " + this.value);
//   navigator.vibrate(1000);
// }
//
// var slider6 = document.getElementById("slider_6");
// var output6 = document.getElementById("slider_6_val");
// output6.innerHTML = slider6.value; // Display the default slider value
// // Update the current slider value (each time you drag the slider handle)
// slider6.oninput = function() {
//   output6.innerHTML = this.value;
//   console.log("slider value: " + this.value);
//   navigator.vibrate(200);
// }
