import { Gyroscope, AbsoluteOrientationSensor } from '../lib/sensors/motion-sensors.js';

// And they're ready for use!
const gyroscope = new Gyroscope({ frequency: 15 });
const orientation = new AbsoluteOrientationSensor({ frequency: 60 });

// let magSensor = new Magnetometer({ frequency: 60 });

gyroscope.addEventListener("reading", (e) => {
  // console.log("Acceleration along the X-axis " + acl.x);
  // document.getElementById("aclx").innerHTML = acl.x;
  // // console.log("Acceleration along the Y-axis " + acl.y);
  // document.getElementById("acly").innerHTML = acl.y;
  // // console.log("Acceleration along the Z-axis " + acl.z);
  // document.getElementById("aclz").innerHTML = acl.z;


  console.log(`Gyroscope along the X-axis ${gyroscope.x}`);
  document.getElementById("gyrx").innerHTML = gyroscope.x;
  console.log(`Gyroscope along the Y-axis ${gyroscope.y}`);
  document.getElementById("gyry").innerHTML = gyroscope.y;
  console.log(`Gyroscope along the Z-axis ${gyroscope.z}`);
  document.getElementById("gyrz").innerHTML = gyroscope.z;
});
gyroscope.addEventListener("error", (event) => {
  console.log(event.error.name, event.error.message);
});
gyroscope.start();





let acl = new Accelerometer({frequency: 60});
acl.addEventListener('reading', () => {
  // console.log("Acceleration along the X-axis " + acl.x);
  document.getElementById("aclx").innerHTML = acl.x;
  // console.log("Acceleration along the Y-axis " + acl.y);
  document.getElementById("acly").innerHTML = acl.y;
  // console.log("Acceleration along the Z-axis " + acl.z);
  document.getElementById("aclz").innerHTML = acl.z;

});

acl.start();


let magSensor = new Magnetometer({ frequency: 60 });

magSensor.addEventListener("reading", (e) => {
  // console.log("Acceleration along the X-axis " + acl.x);
  // document.getElementById("aclx").innerHTML = acl.x;
  // // console.log("Acceleration along the Y-axis " + acl.y);
  // document.getElementById("acly").innerHTML = acl.y;
  // // console.log("Acceleration along the Z-axis " + acl.z);
  // document.getElementById("aclz").innerHTML = acl.z;


  console.log(`Magnetic field along the X-axis ${magSensor.x}`);
  document.getElementById("magx").innerHTML = magSensor.x;
  console.log(`Magnetic field along the Y-axis ${magSensor.y}`);
  document.getElementById("magy").innerHTML = magSensor.y;
  console.log(`Magnetic field along the Z-axis ${magSensor.z}`);
  document.getElementById("magz").innerHTML = magSensor.z;
});
magSensor.addEventListener("error", (event) => {
  console.log(event.error.name, event.error.message);
});
magSensor.start();


navigator.permissions.query({ name: "accelerometer" }).then((result) => {
  if (result.state === "denied") {
    console.log("Permission to use accelerometer sensor is denied.");
    return;
  }
  // Use the sensor.
});

navigator.permissions.query({ name: "magnetometer" }).then((result) => {
  if (result.state === "denied") {
    console.log("Permission to use accelerometer sensor is denied.");
    return;
  }
  // Use the sensor.
});
