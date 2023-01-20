async function onActivateXRButton(event) {
  if (!xrSession) {
    navigator.xr.requestSession("immersive-ar", {
      requiredFeatures: ["local-floor"],
      optionalFeatures: ["bounded-floor"]
    }).then((session) => {
      xrSession = session;
      startSessionAnimation();
    });
  }
}


let xrSession = null;
let xrReferenceSpace = null;
let spaceType = null;

function onSessionStarted(session) {
  xrSession = session;

  spaceType = "bounded-floor";
  xrSession.requestReferenceSpace(spaceType)
  .then(onRefSpaceCreated)
  .catch(() => {
    spaceType = "local-floor";
    xrSession.requestReferenceSpace(spaceType)
    .then(onRefSpaceCreated)
    .catch(handleError);
  });
}

function onRefSpaceCreated(refSpace) {
  xrSession.updateRenderState({
    baseLayer: new XRWebGLLayer(xrSession, gl)
  });

  let startPosition = vec3.fromValues(0, 1.5, 0);
  const startOrientation = vec3.fromValues(0, 0, 1.0);
  xrReferenceSpace = xrReferenceSpace.getOffsetReferenceSpace(
          new XRRigidTransform(startPosition, startOrientation));

  xrSession.requestAnimationFrame(onDrawFrame);
}

// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



// import * as THREE from "../lib/three.js" /*'three''blob:https://threejs.org/e251233d-b8d9-4997-b8a3-04094bbcf3bd';*/
// import { OrbitControls } from "../lib/pose_controller/orbit_controls.js" /*'three/addons/controls/OrbitControls.js''blob:https://threejs.org/901fe772-0300-4912-a632-027cd47a9ad7';*/
// import { TubePainter } from "../lib/pose_controller/tube_painter.js" /*'three/addons/misc/TubePainter.js''blob:https://threejs.org/b2318857-2566-4f31-98fa-800e6750b32d';*/
// import { VRButton } from "../lib/pose_controller/vr_button.js"/*'three/addons/webxr/VRButton.js''blob:https://threejs.org/cb4e8bdc-4bd4-4fca-8d29-7ea97601cc6d';*/
//
// let camera, scene, renderer;
// let controller1, controller2;
//
// const cursor = new THREE.Vector3();
//
// let controls;
//
// init();
// animate();
//
// function init() {
//
// 	const container = document.createElement( 'div' );
// 	document.body.appendChild( container );
//
// 	scene = new THREE.Scene();
// 	scene.background = new THREE.Color( 0x222222 );
//
// 	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 50 );
// 	camera.position.set( 0, 1.6, 3 );
//
// 	controls = new OrbitControls( camera, container );
// 	controls.target.set( 0, 1.6, 0 );
// 	controls.update();
//
// 	const tableGeometry = new THREE.BoxGeometry( 0.5, 0.8, 0.5 );
// 	const tableMaterial = new THREE.MeshStandardMaterial( {
// 		color: 0x444444,
// 		roughness: 1.0,
// 		metalness: 0.0
// 	} );
// 	const table = new THREE.Mesh( tableGeometry, tableMaterial );
// 	table.position.y = 0.35;
// 	table.position.z = 0.85;
// 	scene.add( table );
//
// 	const floorGometry = new THREE.PlaneGeometry( 4, 4 );
// 	const floorMaterial = new THREE.MeshStandardMaterial( {
// 		color: 0x222222,
// 		roughness: 1.0,
// 		metalness: 0.0
// 	} );
// 	const floor = new THREE.Mesh( floorGometry, floorMaterial );
// 	floor.rotation.x = - Math.PI / 2;
// 	scene.add( floor );
//
// 	const grid = new THREE.GridHelper( 10, 20, 0x111111, 0x111111 );
// 	// grid.material.depthTest = false; // avoid z-fighting
// 	scene.add( grid );
//
// 	scene.add( new THREE.HemisphereLight( 0x888877, 0x777788 ) );
//
// 	const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
// 	light.position.set( 0, 4, 0 );
// 	scene.add( light );
//
// 	//
//
// 	const painter1 = new TubePainter();
// 	scene.add( painter1.mesh );
//
// 	const painter2 = new TubePainter();
// 	scene.add( painter2.mesh );
//
// 	//
//
// 	renderer = new THREE.WebGLRenderer( { antialias: true } );
// 	renderer.setPixelRatio( window.devicePixelRatio );
// 	renderer.setSize( window.innerWidth, window.innerHeight );
// 	renderer.outputEncoding = THREE.sRGBEncoding;
// 	renderer.xr.enabled = true;
// 	container.appendChild( renderer.domElement );
//
// 	document.body.appendChild( VRButton.createButton( renderer ) );
//
// 	// controllers
//
// 	function onSelectStart() {
//
// 		this.userData.isSelecting = true;
//
// 	}
//
// 	function onSelectEnd() {
//
// 		this.userData.isSelecting = false;
//
// 	}
//
// 	function onSqueezeStart() {
//
// 		this.userData.isSqueezing = true;
// 		this.userData.positionAtSqueezeStart = this.position.y;
// 		this.userData.scaleAtSqueezeStart = this.scale.x;
//
// 	}
//
// 	function onSqueezeEnd() {
//
// 		this.userData.isSqueezing = false;
//
// 	}
//
// 	controller1 = renderer.xr.getController( 0 );
// 	controller1.addEventListener( 'selectstart', onSelectStart );
// 	controller1.addEventListener( 'selectend', onSelectEnd );
// 	controller1.addEventListener( 'squeezestart', onSqueezeStart );
// 	controller1.addEventListener( 'squeezeend', onSqueezeEnd );
// 	controller1.userData.painter = painter1;
// 	scene.add( controller1 );
//
// 	controller2 = renderer.xr.getController( 1 );
// 	controller2.addEventListener( 'selectstart', onSelectStart );
// 	controller2.addEventListener( 'selectend', onSelectEnd );
// 	controller2.addEventListener( 'squeezestart', onSqueezeStart );
// 	controller2.addEventListener( 'squeezeend', onSqueezeEnd );
// 	controller2.userData.painter = painter2;
// 	scene.add( controller2 );
//
// 	//
//
// 	const geometry = new THREE.CylinderGeometry( 0.01, 0.02, 0.08, 5 );
// 	geometry.rotateX( - Math.PI / 2 );
// 	const material = new THREE.MeshStandardMaterial( { flatShading: true } );
// 	const mesh = new THREE.Mesh( geometry, material );
//
// 	const pivot = new THREE.Mesh( new THREE.IcosahedronGeometry( 0.01, 3 ) );
// 	pivot.name = 'pivot';
// 	pivot.position.z = - 0.05;
// 	mesh.add( pivot );
//
// 	controller1.add( mesh.clone() );
// 	controller2.add( mesh.clone() );
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
// 	const painter = userData.painter;
//
// 	const pivot = controller.getObjectByName( 'pivot' );
//
// 	if ( userData.isSqueezing === true ) {
//
// 		const delta = ( controller.position.y - userData.positionAtSqueezeStart ) * 5;
// 		const scale = Math.max( 0.1, userData.scaleAtSqueezeStart + delta );
//
// 		pivot.scale.setScalar( scale );
// 		painter.setSize( scale );
//
// 	}
//
// 	cursor.setFromMatrixPosition( pivot.matrixWorld );
//
// 	if ( userData.isSelecting === true ) {
//
// 		painter.lineTo( cursor );
// 		painter.update();
//
// 	} else {
//
// 		painter.moveTo( cursor );
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
// 	handleController( controller1 );
// 	handleController( controller2 );
//
// 	renderer.render( scene, camera );
//
// }
//

//# sourceURL=undefined














// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );
//
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
//
// camera.position.z = 5;
//
// function animate() {
//   requestAnimationFrame( animate );
//
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//
//   renderer.render( scene, camera );
// };
//
// animate();
//
//
//

















// const config = {
//     current_env: 'local',
//     crypto: {
//       key_path: './certs/localhost-key.pem',
//       cert_path: './certs/localhost.pem'
//     },
//     networking: {
//       websocket: {
//         // wss_host: wifi_ip,
//         // wss_host: "192.168.225.188",
//         // wss_host: "192.168.225.188",
//         wss_host: "10.42.0.1",
//         wss_port: "8881"
//       }
//     },
//     topics: {
//       publisher: 'touch_xy',
//       subscriber: '_'
//     }
//   };
//
//
// // mqtt
// var clientID = "clientID-touch_pose-" + parseInt(Math.random() * 100);
// const options = {
//   keepalive: 60,
//   clientId: clientID,
//   rejectUnauthorized: false,
//   protocolId: 'MQTT',
//   protocolVersion: 4,
//   clean: true,
//   reconnectPeriod: 1000,
//   connectTimeout: 30 * 1000,
//   will: {
//     topic: 'WillMsg',
//     payload: 'Connection Closed abnormally..!',
//     qos: 1,
//     retain: false
//   },
// }
//
// var host = config['networking']['websocket']['wss_host']
// var port = config['networking']['websocket']['wss_port']
// var uri = 'wss://'+host+':'+port
// // var uri = 'wss://192.168.1.81:8881/'
// // var topic = 'mqtt_to_ros'
// var topic = config['topics']['publisher']
// var client = mqtt.connect(uri, options)
// // On Connection
// client.on('connect', () => {
//   // Print output for the user in the messages div
//   console.log("connected")
//   // document.getElementById("pub_msg_log").innerHTML += '<span> [ PUB ] [ TOPIC | ' + topic + ' ]  [ MSG |' + message +' ] </span><br/>';
// })
//
//
//
//
// let x = 170, y = 100;
// let touchHandler = function(event) {
//
//     let xy_pos = {}
//     if (event.touches && event.touches[0]) {
//         x = event.touches[0].clientX;
//         y = event.touches[0].clientY;
//     } else if (event.originalEvent && event.originalEvent.changedTouches[0]) {
//         x = event.originalEvent.changedTouches[0].clientX;
//         y = event.originalEvent.changedTouches[0].clientY;
//     } else if (event.clientX && event.clientY) {
//         x = event.clientX;
//         y = event.clientY;
//     }
//
//     document.getElementById('x').innerHTML = x;
//     document.getElementById('y').innerHTML = y;
//
//     xy_pos['x'] = x;
//     xy_pos['y'] = y;
//     var touch_values =  JSON.stringify(xy_pos);
//     client.publish(topic, touch_values, { qos: 1 });
//     console.log(touch_values);
//   }
//
//   function draw() {
//     const canvas = document.getElementById('canvas');
//     if (canvas.getContext) {
//       const canvas_l = 300;
//       const ctx = canvas.getContext('2d');
//
//       ctx.beginPath();
//       ctx.moveTo(0, canvas_l);
//       ctx.lineTo(canvas_l/2, canvas_l/2);
//       ctx.lineTo(canvas_l, canvas_l);
//       ctx.lineTo(0, canvas_l);
//     //   ctx.lineTo(100, 25);
//
//     //   ctx.lineTo(100, 25);
//       ctx.fill();
//     }
//   }
//
// //   const el = document.querySelector("canvas");
// //   if(el){
// //     el.addEventListener('touchstart', touchHandler, false);
// //     el.addEventListener('touchmove', touchHandler, false);
// //     el.addEventListener('touchend', touchHandler, false);
// //   }
// function startup() {
//     draw()
//     const el = document.getElementById('canvas');
//     el.addEventListener('touchstart', touchHandler);
//     el.addEventListener('touchend', touchHandler);
//     // el.addEventListener('touchcancel', handleCancel);
//     el.addEventListener('touchmove', touchHandler);
//     // log('Initialized.');
//   }
//
//   document.addEventListener("DOMContentLoaded", startup);
//
//
//
