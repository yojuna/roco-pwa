// import * as THREE from 'three'
// // import { TubePainter } from /*'three/addons/misc/TubePainter.js'*/'blob:https://threejs.org/7838e6ee-0605-4db3-959c-1717d7ceeb20';
// // import { ARButton } from /*'three/addons/webxr/ARButton.js'*/'blob:https://threejs.org/0c99442c-c874-4cbf-a83a-8818bba07e73';
//
// let container;
// let camera, scene, renderer;
// let controller, painter;
//
// const cursor = new THREE.Vector3();
//
// init();
// animate();
//
// function init() {
//
// 	container = document.createElement( 'div' );
// 	document.body.appendChild( container );
//
// 	scene = new THREE.Scene();
//
// 	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );
//
// 	//
//
// 	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
// 	renderer.setPixelRatio( window.devicePixelRatio );
// 	renderer.setSize( window.innerWidth, window.innerHeight );
// 	renderer.xr.enabled = true;
// 	container.appendChild( renderer.domElement );
//
// 	//
//
// 	// document.body.appendChild( ARButton.createButton( renderer ) );
//
// 	// model
//
// 	// const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
// 	// light.position.set( 0, 1, 0 );
// 	// scene.add( light );
//
// 	//
//   //
// 	// painter = new TubePainter();
// 	// painter.setSize( 0.4 );
// 	// painter.mesh.material.side = THREE.DoubleSide;
// 	// scene.add( painter.mesh );
//
// 	//
//
// 	function onSelectStart() {
//
// 		this.userData.isSelecting = true;
// 		this.userData.skipFrames = 2;
//
// 	}
//
// 	function onSelectEnd() {
//
// 		this.userData.isSelecting = false;
//
// 	}
//
// 	controller = renderer.xr.getController( 0 );
// 	controller.addEventListener( 'selectstart', onSelectStart );
// 	controller.addEventListener( 'selectend', onSelectEnd );
// 	controller.userData.skipFrames = 0;
// 	scene.add( controller );
//
// 	//
//
// 	window.addEventListener( 'resize', onWindowResize );
//
// }
//
// function onWindowResize() {
//
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
//
// 	renderer.setSize( window.innerWidth, window.innerHeight );
//
// }
//
// //
//
// function handleController( controller ) {
//
// 	const userData = controller.userData;
//   console.log(controller)
//
// 	cursor.set( 0, 0, - 0.2 ).applyMatrix4( controller.matrixWorld );
//
// 	if ( userData.isSelecting === true ) {
//     console.log('selecting')
//
// 		// if ( userData.skipFrames >= 0 ) {
//     //
// 		// 	// TODO(mrdoob) Revisit this
//     //
// 		// 	userData.skipFrames --;
//     //
// 		// 	painter.moveTo( cursor );
//     //
// 		// } else {
//     //
// 		// 	painter.lineTo( cursor );
// 		// 	painter.update();
//     //
// 		// }
//
// 	}
//
// }
//
// function animate() {
//
// 	renderer.setAnimationLoop( render );
//
// }
//
// function render() {
//
// 	handleController( controller );
//
// 	renderer.render( scene, camera );
//
// }


//# sourceURL=undefined







import * as THREE from 'three';
// import mqtt as mqtt from 'mqtt';
// const mqtt = require('mqtt');
// import { connect } from "mqtt"
// import { OrbitControls } from 'orbit';
var camera, scene, renderer, controls;
// var sphere, cube;
// init();
// animate();
//
// function init() {
//
//   scene = new THREE.Scene();
//   camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
//   camera.position.set(0, 5, 1.5).setLength(100);
//
//   renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   //renderer.setClearColor(0xcccccc);
//   document.body.appendChild(renderer.domElement);
//
//   // controls = new THREE.OrbitControls(camera, renderer.domElement);
//   controls = new OrbitControls(camera, renderer.domElement);
//
//   var plane = new THREE.GridHelper(1000, 10);
//   scene.add(plane);
//
//   // var sphereAxis = new THREE.AxesHelper(200);
//   // scene.add(sphereAxis);
//   var viewAxis = new THREE.AxesHelper(20);
//   scene.add(viewAxis);
//   // sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 8), new THREE.MeshBasicMaterial({color: "red", wireframe: true}));
//   // sphere.position.set(-20, 0, 0);
//   // cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({color: "green", wireframe: true}));
//   // cube.position.set(20, 0, 0);
//   // var worldAxis = new THREE.AxesHelper(20);
//   // sphere.add(worldAxis);
//   // scene.add(sphere);
//   // scene.add(cube);
//
//   // var dotGeometry = new THREE.BufferGeometry();
//   // var vertices = new THREE.Vector3( 0, 0, 0);
//   // // dotGeometry.vertices.push(new THREE.Vector3( 0, 0, 0));
//   // dotGeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 1 ) );
//   // var dotMaterial = new THREE.PointsMaterial( { size: 5, sizeAttenuation: false } );
//   // var dot = new THREE.Points( dotGeometry, dotMaterial );
//   // scene.add( dot );
//
//   const vertices = [];
//
//   for ( let i = 0; i < 10; i ++ ) {
//   	const x = THREE.MathUtils.randFloatSpread( 1000 );
//   	const y = THREE.MathUtils.randFloatSpread( 1000 );
//   	const z = THREE.MathUtils.randFloatSpread( 1000 );
//
//   	vertices.push( x, y, z );
//   }
//
//   const geometry = new THREE.BufferGeometry();
//   geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
//
//   const material = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false} );
//
//   const points = new THREE.Points( geometry, material );
//
//   scene.add( points );
//
//
// }
//
// var delta;
// function animate() {
//   requestAnimationFrame(animate);
//   render();
// }
//
// function render() {
//   renderer.render(scene, camera);
// }
//
//
// function drawFrame(time, frame) {
//   const session = frame.session;
//
//   const pose = frame.getViewerPose(mainReferenceSpace);
//
//   if (pose) {
//     const glLayer = session.renderState.baseLayer;
//     gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer);
//
//     gl.clearColor(0, 0, 0, 1.0);
//     gl.clearDepth(1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_COLOR_BIT);
//
//     for (const view of pose.views) {
//       const viewport = glLayer.getViewport(view);
//       gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
//
//       /* Render the scene now */
//     }
//   }
// }
//



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
      // wss_host: "134.61.150.49",
      // wss_host: "10.10.10.239",
      wss_port: "8881"
    }
  },
  topics: {
    pub: {
      ar_pose: 'ar_pose_mqtt',
      move_robot: 'move_robot',
      open_tool: 'open_tool',
      close_tool: 'close_tool',
      orient_tcp: 'orient_tcp',
    },
    sub: {
      subscriber: 'ros_to_mqtt'
    }
  }
};

// mqtt
var clientID = "phone-pose-" + parseInt(Math.random() * 100);
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
var ar_pose_topic = config['topics']['pub']['ar_pose']
var robot_move_topic = config['topics']['pub']['move_robot']
var open_tool_topic = config['topics']['pub']['open_tool']
var close_tool_topic = config['topics']['pub']['close_tool']
var orient_tcp_topic = config['topics']['pub']['orient_tcp']


var client = mqtt.connect(uri, options)
// On Connection
client.on('connect', () => {

  // Print output for the user in the messages div
  console.log("connected")
  // document.getElementById("pub_msg_log").innerHTML += '<span> [ PUB ] [ TOPIC | ' + topic + ' ]  [ MSG |' + message +' ] </span><br/>';
})

// import { vec3 } from 'gl-matrix';

// XR globals.
let xrButton = document.getElementById('xr-button');
let moveRobotButton = document.getElementById('move_robot');
let openToolButton = document.getElementById('tool_open');
let closeToolButton = document.getElementById('tool_close');
let orientTCPButton = document.getElementById('orient');

let xrSession = null;
let xrRefSpace = null;
// let xrStartRefSpace = null;

// WebGL scene globals.
let gl = null;

function checkSupportedState() {
  navigator.xr.isSessionSupported('immersive-ar',{
      requiredFeatures: ["local-floor"],
      optionalFeatures: ["bounded-floor"]
    }).then((supported) => {
      console.log('supported: ', supported);
  // navigator.xr.isSessionSupported('inline').then((supported) => {
    if (supported) {
      xrButton.innerHTML = 'Enter AR';
    } else {
      xrButton.innerHTML = 'AR not found';
    }

    xrButton.disabled = !supported;
  });
}

function initXR() {
  if (!window.isSecureContext) {
    let message = "WebXR unavailable due to insecure context";
    document.getElementById("warning-zone").innerText = message;
  }

  if (navigator.xr) {
    xrButton.addEventListener('click', onButtonClicked);
    navigator.xr.addEventListener('devicechange', checkSupportedState);
    checkSupportedState();
  }
}

function onButtonClicked() {
  if (!xrSession) {
      // Ask for an optional DOM Overlay, see https://immersive-web.github.io/dom-overlays/
      navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ["local-floor"],
        optionalFeatures: ["bounded-floor"],
        optionalFeatures: ['dom-overlay'],

          domOverlay: {root: document.getElementById('overlay')}
      }).then(onSessionStarted, onRequestSessionError);
  } else {
    xrSession.end();
  }
}

var moveRobotFlag = false;
var orientFlag = false;

function onRobotMove(){
  console.log('moving robot');
  // client.publish('move_robot', , { qos: 1 })
  moveRobotFlag = true;
};

function openTool(){
  console.log('opening tool');
  client.publish(open_tool_topic, 'OK', { qos: 1 });

};

function closeTool(){
  console.log('closing tool');
  client.publish(close_tool_topic, 'OK', { qos: 1 });

};

function orientTCP(){
  console.log('orienting tcp');
  orientFlag = true;
  // client.publish(close_tool_topic, 'OK', { qos: 1 });
};

function onSessionStarted(session) {
  xrSession = session;
  xrButton.innerHTML = 'Exit AR';

  moveRobotButton.addEventListener('click', onRobotMove);
  openToolButton.addEventListener('click', openTool);
  closeToolButton.addEventListener('click', closeTool);
  orientTCPButton.addEventListener('click', orientTCP);

  let canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  gl = canvas.getContext('webgl', {
    xrCompatible: true
  });
  session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) });



  const vertices = [];

  // Show which type of DOM Overlay got enabled (if any)
  if (session.domOverlayState) {
    document.getElementById('session-info').innerHTML = 'DOM Overlay type: ' + session.domOverlayState.type;
  }

  // scene = new THREE.Scene();
  // camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
  // camera.position.set(0, 5, 1.5).setLength(100);
  //
  // // renderer = new THREE.WebGLRenderer();
  //
  // renderer = new THREE.WebGLRenderer({
  //   alpha: true,
  //   preserveDrawingBuffer: true,
  //   canvas: canvas,
  //   context: gl
  // });
  // // const render_width = session.renderState.baseLayer.framebufferWidth;
  // // const render_height = session.renderState.baseLayer.framebufferHeight;
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setSize(render_width, render_height);
  //renderer.setClearColor(0xcccccc);
  // document.body.appendChild(renderer.domElement);
  // const viewport = session.renderState.baseLayer.getViewport(view);
  // renderer.setSize(viewport.width, viewport.height)
  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls = new OrbitControls(camera, renderer.domElement);

  // var plane = new THREE.GridHelper(10000, 1000);
  // scene.add(plane);

  // var sphereAxis = new THREE.AxesHelper(200);
  // scene.add(sphereAxis);
  // var viewAxis = new THREE.AxesHelper(20);
  // scene.add(viewAxis);


function transformOffsetRefSpace(x, y, z, rot_angle){
  // Shift to an arbitrary position/alignment!

  // From the base tracking space.
  // const baseReferenceSpace: XRReferenceSpace = renderer.xr.getReferenceSpace();
  // const transform;
  // offset the rotation by 30 degress
  const axes = new THREE.Vector3(x, y, z);
  const angle = rot_angle;
  const playerRotation = new THREE.Quaternion().setFromAxisAngle(axes, THREE.MathUtils.DEG2RAD * rot_angle);
  const offsetRotation = { x: playerRotation.x, y: playerRotation.y, z: playerRotation.z, w: playerRotation.w };
  // const offsetRotation = { x: playerRotation.z, y: playerRotation.x*-1, z: playerRotation.y, w: playerRotation.w };

  // offset the tracking to center on our player
  const playerPosition = new THREE.Vector3(0, 0, 0);
  const offsetPosition = { x: playerPosition.x, y: playerPosition.y, z: playerPosition.z, w: 1 };

  const transform = new XRRigidTransform(offsetPosition, offsetRotation);

  // const viewerSpace = baseReferenceSpace.getOffsetReferenceSpace(transform);
  //
  // renderer.xr.setOffsetReferenceSpace(viewerSpace);
  return transform
};

// function axesMapper(){
//
// };



  session.addEventListener('end', onSessionEnded);

  // let startPosition = { x: 0, y: 0, z: 0 };
  // const startOrientation = { x: 0, y: 0, z: 0, w: 1 };

  session.requestReferenceSpace('local').then((refSpace) => {
    xrRefSpace = refSpace;
    // xrRefSpace = xrRefSpace.getOffsetReferenceSpace(transformOffsetRefSpace(0,0,0,0));
    // xrRefSpace = xrRefSpace.getOffsetReferenceSpace(transformOffsetRefSpace(0,0,1,-90));
    session.requestAnimationFrame(onXRFrame);
  // render();
  });
}


// mapped the phones axes with robot world frame
// x => -z
// y => -x
// z => y
function createPoseDict(pose){
  const scale_position = 1;
  const scale_orientation = 1;
  const vertices = [];
  const p = pose.transform.position;
  const o = pose.transform.orientation;
  const posedict = {
    pose: {
      // x: p.x.toFixed(3)*10,
      // y: p.y.toFixed(3)*10,
      // z: p.z.toFixed(3)*10,
      // w: p.w.toFixed(3)
      // x: p.x * scale_position,
      // y: p.y * scale_position,
      // z: p.z * scale_position,
      // w: p.w * scale_position
      x: p.z * scale_position * -1,
      y: p.x * scale_position * -1,
      z: p.y * scale_position,
      w: p.w * scale_position
    },
    orientation: {
      // x: o.x.toFixed(3)*10,
      // y: o.y.toFixed(3)*10,
      // z: o.z.toFixed(3)*10,
      // w: o.w.toFixed(3)*10
      // x: o.x * scale_orientation,
      // y: o.y * scale_orientation,
      // z: o.z * scale_orientation,
      // w: o.w * scale_orientation
      x: o.z * scale_orientation * -1,
      y: o.x * scale_orientation * -1,
      z: o.y * scale_orientation,
      w: o.w * scale_orientation
    }
  };
  // vertices.push(p.x.toFixed(3), p.y.toFixed(3), p.z.toFixed(3));
  // document.getElementById('pose').innerText = "Position: " +
  //   p.x.toFixed(3) + ", " + p.y.toFixed(3) + ", " + p.z.toFixed(3);
  document.getElementById('pose').innerText = "Position: " +
    p.x + ", \n" + p.y + ", \n" + p.z;
  return JSON.stringify(posedict);

};

function onXRFrame(t, frame) {
  let session = frame.session;
  session.requestAnimationFrame(onXRFrame);
  //    x: o.
  // // Bind the graphics framebuffer to the baseLayer's framebuffer
  // gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer);
  // Bind the graphics framebuffer to the baseLayer's framebuffer.
  // const framebuffer = session.renderState.baseLayer.framebuffer;
  // gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  // renderer.setFramebuffer(framebuffer);
  //
  // // Update the clear color so that we can observe the color in the
  // // headset changing over time. Use a scissor rectangle to keep the AR
  // // scene visible.
  // const width = session.renderState.baseLayer.framebufferWidth;
  // const height = session.renderState.baseLayer.framebufferHeight;
  // gl.enable(gl.SCISSOR_TEST);
  // gl.scissor(width / 4, height / 4, width / 2, height / 2);
  // let time = Date.now();
  // gl.clearColor(Math.cos(time / 2000), Math.cos(time / 4000), Math.cos(time / 6000), 0.5);
  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  // let pose = frame.getViewerPose(xrStartRefSpsace);
  let pose = frame.getViewerPose(xrRefSpace);
  if (pose) {
    // client.publish(topic, joints_dict, { qos: 1 })

    var pose_dict = createPoseDict(pose)
    client.publish(ar_pose_topic, pose_dict, { qos: 1 });
    // console.log(pose_dict);

    if (moveRobotFlag == true) {
      console.log('moving robot >> ', pose_dict);
      client.publish(robot_move_topic, pose_dict, { qos: 1 });
      moveRobotFlag = false;
    }
    if (orientFlag == true) {
      console.log('orienting tcp of robot >> ', pose_dict);
      client.publish(orient_tcp_topic, pose_dict, { qos: 1 });
      orientFlag = false;
    }
    // cnosr
    // const point = [p.x.toFixed(3), p.y.toFixed(3), p.z.toFixed(3)]


    // const geometry = new THREE.BufferGeometry();
    // geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    // const material = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false} );
    // const points = new THREE.Points( geometry, material );

    // scene.add( points );

    // render();
    // renderer.render(scene, camera);

  } else {
    document.getElementById('pose').innerText = "Position: - - -";
  }
}

  // render();
// }
//
// function render() {
//   renderer.render(scene, camera);
// }

function onRequestSessionError(ex) {
  alert("Failed to start immersive AR session.");
  console.error(ex.message);
}

function onEndSession(session) {
  session.end();
}

function onSessionEnded(event) {
  xrSession = null;
  xrButton.innerHTML = 'Enter AR';
  document.getElementById('session-info').innerHTML = '';
  gl = null;
}



initXR();
