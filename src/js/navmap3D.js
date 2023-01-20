// import {config} from '../pwa/app_config.js'
// console.log('config: ', config)

function init() {
    var ssl_ngrok_url = '34e6-2001-4dd5-aa75-0-e4e6-1e0a-a3d1-cff6.eu.ngrok.io';
    // Connect to ROS.
    var ros = new ROSLIB.Ros({
      url : 'wss://' + ssl_ngrok_url
    });

    // Create the main viewer.
    var viewer = new ROS3D.Viewer({
      divID : 'map',
      width : 966,
      height : 1300,
      antialias : true
    });

    // Setup the map client.
    var gridClient = new ROS3D.OccupancyGridClient({
      ros : ros,
      rootObject : viewer.scene,
      continuous: true
    });
  }

  init()