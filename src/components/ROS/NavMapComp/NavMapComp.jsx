import React, { useState, useEffect, useContext } from 'react'
import NAV2D from '@/lib/ROS/nav2d_react'
import ROS2D from '@/lib/ROS/ros2d_react'
import ROSLIB from 'roslib'
import PropTypes from 'prop-types';
import { ngrok_uri } from '@/config'
import { ROSContext } from '../ROSContext';
import { ROS, useROS } from '../ROS'
import { Button, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Joystick } from '@/components/Joystick';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

function NavMapComp(props){
  const [ ros, setROS ] = useContext(ROSContext);
  const { isConnected, url, changeUrl, toggleConnection } = useROS();
  // const [ connected, setConnected ] = useState(false)
  // const [ nav, setNav] = useState();
  const defaultURL = "wss://"+ngrok_uri;
  // var viewer = null
  var navClient = null
  // console.log('props: ', props)
  useEffect(() => {
    // var navROS = ros.ROS;
    // props.ros = ros.ROS;
    // console.log(ros)
    // Create the main viewer.
    var viewer = new ROS2D.Viewer({
      divID : props.divID,
      width : props.width,
      height : props.height,
      // width : '100%',
      // height : '100%'
      antialias : true
    });

    // Setup the nav client.
    var nav = NAV2D.OccupancyGridClientNav({
      ros : ros.ROS,
      rootObject : viewer.scene,
      viewer : viewer,
      serverName : props.serverName
    });
    // setNav(navClient)
    console.log('props:', props)

    // setConnected(isConnected)
  
    // viewer.scene.scaleX*=2
    // viewer.scene.scaleY*=2
    // console.log('iscon', ros.isConnected)

  }, []);

  // useEffect(() => {    
  //   const rosUrl = 'wss://'+ngrok_uri

  //   // // Connect to ROS.
  //   // var rosNew = new ROSLIB.Ros({
  //   //   url : rosUrl
  //   // });
  // useEffect(() => {
  //   console.log(navClient)
  // }, [nav]);


  // }, []);



      return (

        <ROS>
          <Grid2 maxHeight={window.innerHeight} disableEqualOverflow>
    <Container maxWidth="lg"  sx={{ mt: 4, mb: 4 }}>
      <Grid2 container spacing={2}>

      <Grid2 item xs={12}>
          <Paper sx={{ p: 2, 
                        display: 'flex',
                        flexDirection: 'column',
                        }}>
              <Grid2 container spacing={1}>
                <Grid2>
                  <TextField
                    id="outlined-helperText"
                    label="Connect To ROS"
                    defaultValue={ defaultURL }
                    helperText="ROSBridge Ngrok URL"
                    onChange={event => changeUrl(event.target.value)}
                  />
                </Grid2>
                <Grid2>
                  {/* <Typography variant="h6">ROS CONNECT</Typography> */}
                  <Button onClick={ toggleConnection } variant="contained">CONNECT</Button>
                  <Typography variant="subtitle1">status: { isConnected ? "connected" : "not_connected" }</Typography>
                </Grid2>
                {/* <Grid2> */}
                {/* <br/> */}
                {/* <Typography variant="subtitle1">ROS Status: { isConnected ? "connected" : "not connected" }</Typography> */}
                    {/* <div> */}
                      {/* <pre>{ isConnected ? "connected" : "not connected" }</pre> */}
                      {/* <pre>{ connected ? "connected" : "not connected" }</pre> */}
                    {/* </div> */}
                {/* </Grid2> */}
                {/* <Grid2>
                      <Box
                        sx={{
                          width: 'auto',
                          p: 1,
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                          color: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                          border: '1px solid',
                          borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                          borderRadius: 2,
                          fontSize: '0.575rem',
                          fontWeight: '700',
                          textAlign: 'left',
                        }}
                      >
                        <input name="urlInput" defaultValue={ defaultURL } onChange={event => changeUrl(event.target.value)} />
                        <b>ROS url: </b><pre>{url}</pre>
                      </Box>  
                  
                  <b>ROS url: </b><pre>{url}</pre>
                </Grid2> */}
                
              </Grid2>

              {/* <Container>
                  <Typography variant="subtitle1">ROS URL: </Typography>
                  <input name="urlInput" defaultValue={ defaultURL } onChange={event => changeUrl(event.target.value)} /> <br />
                  <b>ROS url to connect to: {'>'}  </b>
                      <div>
                          <pre>{url}</pre>
                      </div>
                  <br />
              </Container> */}
              {/* <Container>
                  <Typography variant="subtitle1">ROS Status: </Typography>
                  <div>
                    <pre>{ isConnected ? "connected" : "not connected" }</pre>
                  </div>
              </Container> */}
          </Paper>
        </Grid2>
        <Grid2 item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              // height: '90vw',  
              height: '60vh',  
              // width: '100%'
            }}
          >
            <Container disableGutters
              sx={{
                position: 'relative',
                height: '100%',

              }}
              >
                <div id={ props.divID } 
                style={{
                  // display: 'flex',
                  // flexDirection: 'column',
                  // alignItems: 'center',
                  position: 'relative',
                  height: '100%',
                  // width: 300
                  // backgroundColor: '#fafafa',
                  // margin: '20px',
                }} 
                />

              </Container>
          </Paper>
        </Grid2>
        <Grid2 item xs={12} md={4} lg={3} spacing={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'right',
              height: '25vh',
              // width: 200
            }}
          >
            <Joystick/>
          </Paper>
        </Grid2>
        {/* <Grid2 item xs={12} md={4} lg={3} spacing={3}>
        <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '20vh',
              // width: 
            }}
          >
            <Typography variant="h6">ROS CONNECT</Typography>
          </Paper>
        </Grid2> */}
      </Grid2>
    </Container>
  </Grid2>
<br/>
        </ROS>
      );
  }

// const ros_url = ;
// // // const ros_url = 'ws://localhost:9090';

const navCanvasDimension = 300

NavMapComp.defaultProps = {
  ros: new ROSLIB.Ros({
    url : 'wss://'+ngrok_uri
  }),
  divID: 'nav2d',
  width: navCanvasDimension,
  height: navCanvasDimension,
  serverName: '/move_base'
};

NavMapComp.propTypes = {
  ros: PropTypes.object,
  divID: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  serverName: PropTypes.string
}

export default NavMapComp






// <Container>
//               <Box>
//                 <Typography variant="h4">ROS CONNECT</Typography>
//                   <Button onClick={ toggleConnection } variant="contained">CONNECT</Button>
//               </Box>
//               <Container>
//                   <Typography variant="h5">ROS URL: </Typography>
//                   <input name="urlInput" defaultValue={ defaultURL } onChange={event => changeUrl(event.target.value)} /> <br />
//                   <b>ROS url to connect to: {'>'}  </b>
//                       <div>
//                           <pre>{url}</pre>
//                       </div>
//                   <br />
//               </Container>
//               <Container>
//                   <Typography variant="h5">ROS Status: </Typography>
//                   <div>
//                     <pre>{ isConnected ? "connected" : "not connected" }</pre>
//                   </div>
//               </Container>
//               <Container>
//                 <div id={ props.divID } width={ props.width }/>
//               </Container>
//           </Container>