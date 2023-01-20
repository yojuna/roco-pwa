var video, canvas, context, imageData, detector, markers, posit;
var stats
var renderer, scene, camera, line
// var renderer1, renderer2, renderer3;
// var scene1, scene2, scene3, scene4;
// var camera1, camera2, camera3, camera4;
// var plane1, plane2, model, texture;
var step = 0.0;
const constraints = {
  audio: false,
  video: true,
  video: {
    facingMode: "environment",
    // width: screen.height,
    // height: screen.width
    // facingMode: "user",
    // width: { min: 640, ideal: 1280, max: 1920 },
    // height: { min: 480, ideal: 640, max: 720 }
  }

  // Other useful props:
  // width: 1280, height: 720  -- preference only
  // facingMode: {exact: "user"} // forcing to be user camera
  // facingMode: "environment"
};
var modelSize = 19.0; //millimeters

function onLoad(){

  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  // canvas.width = video.videoWidth;
  // canvas.height = video.videoHeight;
  // canvas.width = 480;
  // canvas.height = 360;
  context = canvas.getContext("2d");

  // canvas.width = parseInt(canvas.style.width);
  // canvas.height = parseInt(canvas.style.height);


  canvas.width = document.body.clientWidth; //document.width is obsolete
  canvas.height = document.body.clientHeight; //document.height is obsolete


  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }

  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
      var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }

      return new Promise(function(resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
      if ("srcObject" in video) {
        video.srcObject = stream;
      } else {
        video.src = window.URL.createObjectURL(stream);
      }
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    }
  );

  detector = new AR.Detector();
  posit = new POS.Posit(modelSize, canvas.width);

  createRenderers();
  createScenes();
  stats = createStats();
  document.body.appendChild( stats.domElement );

  requestAnimationFrame(tick);
};

function createStats() {
  var stats = new Stats();
  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0';
  stats.domElement.style.top = '0';

  return stats;
}


function tick(){

  requestAnimationFrame(tick);

  if (video.readyState === video.HAVE_ENOUGH_DATA){
    snapshot();

    var markers = detector.detect(imageData);
    if (markers.length > 0){
      var corners = getCorners(markers);
      var pose = posit.pose(corners);
      drawCorners(markers);
      // console.log(pose);
      // console.log(pose);
      // console.log()
    };


    // drawId(markers);
    // getPose(markers);
    // updateScenes(markers);
    // drawLines();
    render();
  }
  stats.update();
};

function snapshot(){
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  imageData = context.getImageData(0, 0, canvas.width, canvas.height);
};

function drawCorners(markers){
  var corners, corner, i, j;

  context.lineWidth = 3;

  for (i = 0; i < markers.length; ++ i){
    corners = markers[i].corners;

    context.strokeStyle = "green";
    context.beginPath();

    for (j = 0; j < corners.length; ++ j){
      corner = corners[j];
      context.moveTo(corner.x, corner.y);
      corner = corners[(j + 1) % corners.length];
      context.lineTo(corner.x, corner.y);
    }

    context.stroke();
    context.closePath();

    context.strokeStyle = "red";
    context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
  }

};


function getCorners(markers){
  var corners = markers[0].corners;

  for (i = 0; i < corners.length; ++ i){
    var corner = corners[i];

    corner.x = corner.x - (canvas.width / 2);
    corner.y = (canvas.height / 2) - corner.y;
  }

  return corners
};




//
//   var corners, corner, i;
//   if (markers.length > 0){
//     console.log(markers)
//
//     corners = markers[0].corners;
//
//     for (i = 0; i < corners.length; ++ i){
//       corner = corners[i];
//
//       corner.x = corner.x - (canvas.width / 2);
//       corner.y = (canvas.height / 2) - corner.y;
//     }
// };

function getPose(markers){
  var corners, corner, pose, i;

  if (markers.length > 0){
    console.log(markers)

    corners = markers[0].corners;

    for (i = 0; i < corners.length; ++ i){
      corner = corners[i];

      corner.x = corner.x - (canvas.width / 2);
      corner.y = (canvas.height / 2) - corner.y;
    }

    pose = posit.pose(corners);
    console.log(pose)

    // updateObject(plane1, pose.bestRotation, pose.bestTranslation);
    // updateObject(plane2, pose.alternativeRotation, pose.alternativeTranslation);
    // updateObject(model, pose.bestRotation, pose.bestTranslation);
    //
    // updatePose("pose1", pose.bestError, pose.bestRotation, pose.bestTranslation);
    // updatePose("pose2", pose.alternativeError, pose.alternativeRotation, pose.alternativeTranslation);
    //
    // step += 0.025;
    //
    // model.rotation.z -= step;
  }

  // texture.children[0].material.map.needsUpdate = true;
};

function drawId(markers){
  var corners, corner, x, y, i, j;

  context.strokeStyle = "blue";
  context.lineWidth = 1;

  for (i = 0; i !== markers.length; ++ i){
    corners = markers[i].corners;

    x = Infinity;
    y = Infinity;

    for (j = 0; j !== corners.length; ++ j){
      corner = corners[j];

      x = Math.min(x, corner.x);
      y = Math.min(y, corner.y);
    }

    context.strokeText(markers[i].id, x, y)
  }
}

function updateScenes(markers){
  var corners, corner, pose, i;

  if (markers.length > 0){
    corners = markers[0].corners;

    for (i = 0; i < corners.length; ++ i){
      corner = corners[i];

      corner.x = corner.x - (canvas.width / 2);
      corner.y = (canvas.height / 2) - corner.y;
    }

    pose = posit.pose(corners);
    // console.log(pose)

    updateObject(plane1, pose.bestRotation, pose.bestTranslation);
    updateObject(plane2, pose.alternativeRotation, pose.alternativeTranslation);
    updateObject(model, pose.bestRotation, pose.bestTranslation);

    updatePose("pose1", pose.bestError, pose.bestRotation, pose.bestTranslation);
    updatePose("pose2", pose.alternativeError, pose.alternativeRotation, pose.alternativeTranslation);

    step += 0.025;

    model.rotation.z -= step;
  }

  texture.children[0].material.map.needsUpdate = true;
};


function createRenderers(){
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( canvas.innerWidth, canvas.innerHeight );
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 45, canvas.innerWidth / canvas.innerHeight, 1, 500 );
  camera.position.set( 0, 0, 100 );
  camera.lookAt( 0, 0, 0 );

  scene = new THREE.Scene();

  scene.add( camera );
};

function render(){
  renderer.clear();
  renderer.render( scene, camera );

  // renderer2.clear();
  // renderer2.render(scene2, camera2);
  //
  // renderer3.autoClear = false;
  // renderer3.clear();
  // renderer3.render(scene3, camera3);
  // renderer3.render(scene4, camera4);
};

function createScenes(){
  line = createLine();
  scene.add(line);

  // plane1 = createPlane();
  // scene1.add(plane1);

};

function createLine(){
  const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

  const points = [];
  points.push( new THREE.Vector3( - 10, 0, 0 ) );
  points.push( new THREE.Vector3( 0, 10, 0 ) );
  points.push( new THREE.Vector3( 10, 0, 0 ) );

  const geometry = new THREE.BufferGeometry().setFromPoints( points );

  const line = new THREE.Line( geometry, material );

  return line
};

function createPlane(){
  var object = new THREE.Object3D(),
      geometry = new THREE.PlaneGeometry(1.0, 1.0, 0.0),
      material = new THREE.MeshNormalMaterial(),
      mesh = new THREE.Mesh(geometry, material);

  object.eulerOrder = 'YXZ';

  object.add(mesh);

  return object;
};

function createTexture(){
  var texture = new THREE.Texture(video),
      object = new THREE.Object3D(),
      geometry = new THREE.PlaneGeometry(1.0, 1.0, 0.0),
      material = new THREE.MeshBasicMaterial( {map: texture, depthTest: false, depthWrite: false} ),
      mesh = new THREE.Mesh(geometry, material);

  object.position.z = -1;

  object.add(mesh);

  return object;
};

function createModel(){
  var object = new THREE.Object3D(),
      geometry = new THREE.SphereGeometry(0.5, 15, 15, Math.PI),
      texture = THREE.ImageUtils.loadTexture("../images/earth.jpg"),
      material = new THREE.MeshBasicMaterial( {map: texture} ),
      mesh = new THREE.Mesh(geometry, material);

  object.add(mesh);

  return object;
};



function updateObject(object, rotation, translation){
  object.scale.x = modelSize;
  object.scale.y = modelSize;
  object.scale.z = modelSize;

  object.rotation.x = -Math.asin(-rotation[1][2]);
  object.rotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
  object.rotation.z = Math.atan2(rotation[1][0], rotation[1][1]);

  object.position.x = translation[0];
  object.position.y = translation[1];
  object.position.z = -translation[2];
};

function updatePose(id, error, rotation, translation){
  var yaw = -Math.atan2(rotation[0][2], rotation[2][2]);
  var pitch = -Math.asin(-rotation[1][2]);
  var roll = Math.atan2(rotation[1][0], rotation[1][1]);

  var d = document.getElementById(id);
  d.innerHTML = " error: " + error
              + "<br/>"
              + " x: " + (translation[0] | 0)
              + " y: " + (translation[1] | 0)
              + " z: " + (translation[2] | 0)
              + "<br/>"
              + " yaw: " + Math.round(-yaw * 180.0/Math.PI)
              + " pitch: " + Math.round(-pitch * 180.0/Math.PI)
              + " roll: " + Math.round(roll * 180.0/Math.PI);
};

window.onload = onLoad;





// for the base example
//
// var video, canvas, context, imageData, detector;
// const constraints = {
//   audio: false,
//   video: true,
//   video: {
//     facingMode: "environment",
//     width: screen.height,
//     height: screen.width
//     // facingMode: "user",
//     // width: { min: 640, ideal: 1280, max: 1920 },
//     // height: { min: 480, ideal: 640, max: 720 }
//   }
//
//   // Other useful props:
//   // width: 1280, height: 720  -- preference only
//   // facingMode: {exact: "user"} // forcing to be user camera
//   // facingMode: "environment"
// };
//
// function onLoad(){
//   video = document.getElementById("video");
//   canvas = document.getElementById("canvas");
//   context = canvas.getContext("2d");
//
//
//   // canvas.width = parseInt(canvas.style.width);
//   // canvas.height = parseInt(canvas.style.height);
//
//   canvas.width = document.body.clientWidth; //document.width is obsolete
//   canvas.height = document.body.clientHeight; //document.height is obsolete
//   // canvasW = canvas.width;
//   // canvasH = canvas.height;
//
//   // canvas.width = 480;
//   // canvas.height = 360;
//
//   if (navigator.mediaDevices === undefined) {
//     navigator.mediaDevices = {};
//   }
//
//   if (navigator.mediaDevices.getUserMedia === undefined) {
//     navigator.mediaDevices.getUserMedia = function(constraints) {
//       var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//
//       if (!getUserMedia) {
//         return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
//       }
//
//       return new Promise(function(resolve, reject) {
//         getUserMedia.call(navigator, constraints, resolve, reject);
//       });
//     }
//   }
//
//   navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then(function(stream) {
//       if ("srcObject" in video) {
//         video.srcObject = stream;
//       } else {
//         video.src = window.URL.createObjectURL(stream);
//       }
//     })
//     .catch(function(err) {
//       console.log(err.name + ": " + err.message);
//     }
//   );
//
//   detector = new AR.Detector();
//
//   requestAnimationFrame(tick);
// }
//
// function tick(){
//   requestAnimationFrame(tick);
//
//   if (video.readyState === video.HAVE_ENOUGH_DATA){
//     snapshot();
//
//     var markers = detector.detect(imageData);
//     console.log(markers)
//     drawCorners(markers);
//     drawId(markers);
//   }
// }
//
// function snapshot(){
//   context.drawImage(video, 0, 0, canvas.width, canvas.height);
//   imageData = context.getImageData(0, 0, canvas.width, canvas.height);
// }
//
// function drawCorners(markers){
//   var corners, corner, i, j;
//
//   context.lineWidth = 3;
//
//   for (i = 0; i !== markers.length; ++ i){
//     corners = markers[i].corners;
//
//     context.strokeStyle = "red";
//     context.beginPath();
//
//     for (j = 0; j !== corners.length; ++ j){
//       corner = corners[j];
//       context.moveTo(corner.x, corner.y);
//       corner = corners[(j + 1) % corners.length];
//       context.lineTo(corner.x, corner.y);
//     }
//
//     context.stroke();
//     context.closePath();
//
//     context.strokeStyle = "green";
//     context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
//   }
// }
//
// function drawId(markers){
//   var corners, corner, x, y, i, j;
//
//   context.strokeStyle = "blue";
//   context.lineWidth = 1;
//
//   for (i = 0; i !== markers.length; ++ i){
//     corners = markers[i].corners;
//
//     x = Infinity;
//     y = Infinity;
//
//     for (j = 0; j !== corners.length; ++ j){
//       corner = corners[j];
//
//       x = Math.min(x, corner.x);
//       y = Math.min(y, corner.y);
//     }
//
//     context.strokeText(markers[i].id, x, y)
//   }
// }
//
// window.onload = onLoad;
