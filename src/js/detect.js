// var uri = 'wss://10.42.0.1:8881/'
var uri = 'wss://10.10.10.239:8881/'
/**
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

/********************************************************************
 * Demo created by Jason Mayes 2020.
 *
 * Got questions? Reach out to me on social:
 * Twitter: @jason_mayes
 * LinkedIn: https://www.linkedin.com/in/creativetech
 ********************************************************************/

 // // Function to hide the Spinner
 // function hideSpinner() {
 //     document.getElementById('spinner')
 //             .style.display = 'none';
 // }

// // sidebar
//  $(document).ready(function () {
//      $("#sidebar").mCustomScrollbar({
//          theme: "minimal"
//      });
//
//      $('#dismiss, .overlay').on('click', function () {
//          // hide sidebar
//          $('#sidebar').removeClass('active');
//          // hide overlay
//          $('.overlay').removeClass('active');
//      });
//
//      $('#sidebarCollapse').on('click', function () {
//          // open sidebar
//          $('#sidebar').addClass('active');
//          // fade in the overlay
//          $('.overlay').addClass('active');
//          $('.collapse.in').toggleClass('in');
//          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
//      });
//  });



const demosSection = document.getElementById('demos');
var model = undefined;


const vibration_duration = 600
const vibration_duration_step = 50

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
  demosSection.classList.remove('invisible');
  // hideSpinner();
});


// /********************************************************************
// // Demo 1: Grab a bunch of images from the page and classify them
// // upon click.
// ********************************************************************/

// In this demo, we have put all our clickable images in divs with the
// CSS class 'classifyOnClick'. Lets get all the elements that have
// this class.
// const imageContainers = document.getElementsByClassName('classifyOnClick');
//
// // Now let's go through all of these and add a click event listener.
// for (let i = 0; i < imageContainers.length; i++) {
//   // Add event listener to the child element whichis the img element.
//   imageContainers[i].children[0].addEventListener('click', handleClick);
// }
//
// // When an image is clicked, let's classify it and display results!
// function handleClick(event) {
//   if (!model) {
//     console.log('Wait for model to load before clicking!');
//     return;
//   }
//
//   // We can call model.classify as many times as we like with
//   // different image data each time. This returns a promise
//   // which we wait to complete and then call a function to
//   // print out the results of the prediction.
//   model.detect(event.target).then(function (predictions) {
//     // Lets write the predictions to a new paragraph element and
//     // add it to the DOM.
//     console.log("starting predictions...")
//     console.log(predictions);
//     for (let n = 0; n < predictions.length; n++) {
//       // Description text
//       const p = document.createElement('p');
//       p.innerText = predictions[n].class  + ' - with '
//           + Math.round(parseFloat(predictions[n].score) * 100)
//           + '% confidence.';
//       // Positioned at the top left of the bounding box.
//       // Height is whatever the text takes up.
//       // Width subtracts text padding in CSS so fits perfectly.
//       p.style = 'left: ' + predictions[n].bbox[0] + 'px;' +
//           'top: ' + predictions[n].bbox[1] + 'px; ' +
//           'width: ' + (predictions[n].bbox[2] - 10) + 'px;';
//
//       const highlighter = document.createElement('div');
//       highlighter.setAttribute('class', 'highlighter');
//       highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px;' +
//           'top: ' + predictions[n].bbox[1] + 'px;' +
//           'width: ' + predictions[n].bbox[2] + 'px;' +
//           'height: ' + predictions[n].bbox[3] + 'px;';
//
//       event.target.parentNode.appendChild(highlighter);
//       event.target.parentNode.appendChild(p);
//     }
//   });
// }



// /********************************************************************
// // Demo 2: Continuously grab image from webcam stream and classify it.
// // Note: You must access the demo on https for this to work:
// // https://tensorflow-js-image-classification.glitch.me/
// ********************************************************************/

const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');

// Check if webcam access is supported.
function hasGetUserMedia() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

// Keep a reference of all the child elements we create
// so we can remove them easilly on each render.
var children = [];


// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
  console.log("here")
  const enableWebcamButton = document.getElementById('webcamButton');
  enableWebcamButton.addEventListener('click', enableCam);
} else {
  console.warn('getUserMedia() is not supported by your browser');
}


// Enable the live webcam view and start classification.
async function enableCam(event) {
  if (!model) {
    console.log('Wait! Model not loaded yet.')
    return;
  }

  // Hide the button.
  event.target.classList.add('removed');


  // // getUsermedia parameters.
  // const constraints = {
  //   video: true
  // };
  const constraints = {
    // audio: false,
    video: true,
    video: {
      facingMode: "environment",
      width: screen.height,
      height: screen.width
      // facingMode: "user",
      // width: { min: 640, ideal: 1280, max: 1920 },
      // height: { min: 480, ideal: 640, max: 720 }
    }

    // Other useful props:
    // width: 1280, height: 720  -- preference only
    // facingMode: {exact: "user"} // forcing to be user camera
    // facingMode: "environment"
  };
  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  });
}

var confidence_cutoff = 0.66;
// Prediction loop!
function predictWebcam() {
  // Now let's start classifying the stream.
  model.detect(video).then(function (predictions) {
    // Remove any highlighting we did previous frame.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);

    // Now lets loop through predictions and draw them to the live view if
    // they have a high confidence score.
    for (let n = 0; n < predictions.length; n++) {
      // If we are over 66% sure we are sure we classified it right, draw it!
      // console.log(predictions[n])
      if (predictions[n].score > confidence_cutoff) {
        const p = document.createElement('p');
        p.innerText = predictions[n].class  + ' - with '
            + Math.round(parseFloat(predictions[n].score) * 100)
            + '% confidence.';
        // Draw in top left of bounding box outline.
        p.style = 'left: ' + predictions[n].bbox[0] + 'px;' +
            'top: ' + predictions[n].bbox[1] + 'px;' +
            'width: ' + (predictions[n].bbox[2] - 10) + 'px;';

        // Draw the actual bounding box.
        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
            + predictions[n].bbox[1] + 'px; width: '
            + predictions[n].bbox[2] + 'px; height: '
            + predictions[n].bbox[3] + 'px;';

        liveView.appendChild(highlighter);
        liveView.appendChild(p);

        // Store drawn objects in memory so we can delete them next time around.
        children.push(highlighter);
        children.push(p);
      }
    }

    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
  });
}



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
// var uri = 'wss://'+host+':'+port
// var uri = 'wss://192.168.0.7:8881/'
var topic = 'mqtt_to_ros'
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



// <!-- NED specs
// Joints range degrees
// -170 ° ≤ Joint 1 ≤ 170 °
// -120 ° ≤ Joint 2 ≤ 35 °
// -77 ° ≤ Joint 3 ≤ 90 °
// -120 ° ≤ Joint 4 ≤ 120 °
// -100 ° ≤ Joint 5 ≤ 55 °
// -145 ° ≤ Joint 6 ≤ 145 °
//
// Joints range radian
// -2,97 rad ≤ Joint 1 ≤ 2,97 rad
// -2,09 rad ≤ Joint 2 ≤ 0,61 rad
// -1.34 rad ≤ Joint 3 ≤ 1,57 rad
// -2,09 rad ≤ Joint 4 ≤ 2,09 rad
// -1,75 rad ≤ Joint 5 ≤ 0,96 rad
// -2,53 rad ≤ Joint 6 ≤ -2,53 rad -->


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
jointValues['joint7'] = 0;

// var topic = "move_ned"

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
    client.publish(topic, joints_dict, { qos: 2 })
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

// import { MDCSlider } from '@material/slider/dist/mdc.slider'
// import {MDCSlider} from '@material/slider';
// import {MDCSlider} from '../lib/material-components-web.min.js';
// import { MDCSlider } from '@material/slider/dist/mdc.slider'

// var MDCSlider = require('../lib/material-components-web.min.js')
//

// slider_comp = document.getElementById("slider_1");
// var sldr = new mdc.slider.MDCSlider(document.querySelector('.mdc-slider'));
// sldr.root.addEventListener('MDCSlider:change', (e)=>console.log(e));
//
// const MDCSlider = mdc.slider.MDCSlider;
// const slider7 = new MDCSlider(document.querySelector('.mdc-slider'));
// var output7 = document.getElementById("slider_7_val");
//
// slider7.root.addEventListener('MDCSlider:change',  function() {
//   console.log("hereee")
//   console.log(String(slider7.getValue()));
//   // output7.innerHTML = String(slider7.getValue());
//   console.log("slider value: " + slider7.getValue());
//   navigator.vibrate(vibration_duration);
//   // update joints dict with new slider value
//   jointValues['joint7'] = slider7.getValue();
//   // var topic = "mqtt_to_ros"
//   // var message =  this.value;
//   // stringify for mqtt and send full json dict
//   var joints_dict =  JSON.stringify(jointValues);
//   client.publish(topic, joints_dict, { qos: 2 })
//
//   console.log(JSON.stringify(jointValues));
//
// });

//
// slider7.input = function() {
//
//   console.log("slider valuedssdv: " + this.getValue());
// }
//
//
// sldr.root.addEventListener('MDCSlider:change', (e)=>console.log(e));
//


//
// const MDCSlider = MDC.slider.MDCSlider;
// const slider = new MDCSlider(document.querySelector('.mdc-slider'));
// slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));
// console.log(slider_new)
