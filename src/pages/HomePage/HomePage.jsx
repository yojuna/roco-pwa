import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

// import muiLogo from './logos/mui.svg';
import pwaLogo from './logos/pwa.svg';
import reactLogo from './logos/react_ed.svg';
// import recoilLogo from './logos/recoil.svg';
// import rrLogo from './logos/rr.svg';
// import tsLogo from './logos/ts.svg';
// import viteLogo from './logos/vite.svg';
import { Image } from './styled';
// import { Container, width } from '@mui/system';
import ToggleConnect from '@/components/ROS/ToggleConnect/ToggleConnect';
import TopicsList from '@/components/ROS/TopicsList';

function HomePage() {
  
  const isPortrait = useOrientation();

  const width = isPortrait ? '40%' : '30%';
  const height = isPortrait ? '30%' : '40%';

  return (
    <>
      <Meta title="Welcome" />
      <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
        <Image alt="react" src={reactLogo} sx={{ width, height }} />
        <ToggleConnect/>
        <TopicsList/>
        <Image alt="pwa" src={pwaLogo} />
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default HomePage;



      // <Typography variant="h5">ROS CONNECT</Typography>
      //   <br></br>
      //   <Typography variant="h5">Message Queue Length:</Typography>
      //   <input name="queueInput" defaultValue={ queue } onChange={event => handleQueue(event.target.value)} />
      //   <br></br>
      //   <Typography variant="h5">Compression:</Typography>
      //   <input name="compInput" defaultValue={ compression } onChange={event => handleCompression(event.target.value)} />
      //   <br></br>
      //   <Typography variant="h5">Topic to echo:</Typography>
      //   <input name="topicInput" defaultValue={ topic } onChange={event => handleTopic(event.target.value)} />