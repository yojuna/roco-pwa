/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found at:
 *  https://github.com/webrtc/samples/blob/gh-pages/LICENSE.md
 */

'use strict';

// Put variables in global scope to make them available to the browser console.
const video = window.video = document.getElementById('webcam_canvas');
const canvas = window.canvas = document.getElementById('out_canvas');
var stats

// set camera info
var cameraInfoBox = document.getElementById('camera_info');
const cameraInfoDefaults = window.cameraInfo = JSON.parse(cameraInfoBox.value);

canvas.width = 480;
canvas.height = 360;

// request video according to camera parameters
// const constraints = {
//   audio: false,
//   video: true,
//   video: { width: cameraInfo.img_size[0], height: cameraInfo.img_size[1] }
// };



const constraints = {
  audio: false,
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


function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

// Change listener for camera parameters
cameraInfoBox.addEventListener('change', function() {
  try {
    window.cameraInfo = JSON.parse(cameraInfoBox.value);
  } catch (err) {
    console.log("Error parsing camera parameters!", err);
    cameraInfoBox.value = JSON.stringify(cameraInfoDefaults, null, 2);
  }
});
