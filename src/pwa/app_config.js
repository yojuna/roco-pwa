// var os = require('os');
// var networkInterfaces = os.networkInterfaces();
// var wifi_ip = networkInterfaces['wlo1']['0']['address']

//print network info on console
// console.log(networkInterfaces);
// console.log(wifi_ip);

const config = {
  current_env: 'local',
  crypto: {
    key_path: './certs/localhost-key.pem',
    cert_path: './certs/localhost.pem'
  },
  networking: {
    websocket: {
      wss_host: 'local',
      wss_port: 8881
    }
  },
  topics: {
    publisher: 'mqtt_to_ros',
    subscriber: 'ros__to_mqtt'
  },
  ngrok_uri: '7859-2001-4dd5-aa75-0-494a-830b-22cc-6dfd.eu.ngrok.io'

};

module.exports = { config };
// export default config
