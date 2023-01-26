import { useHotkeys } from 'react-hotkeys-hook';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import useHotKeysDialog from '@/store/hotkeys';
import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';

import { ROSContext } from '@/components/ROS/ROSContext'
import { useContext } from 'react'
import { Container } from '@mui/system';

function HotKeys() {
  const [ ros, setROS ] = useContext(ROSContext);
  const [, themeActions] = useTheme();
  const [, sidebarActions] = useSidebar();
  const [isHotKeysDialogOpen, hotKeysDialogActions] = useHotKeysDialog();

  // I would love to define all hotkeys in the config and loop it here and avoid this repetitive code.
  // But the `react-hotkeys-hook` library, which we use to handle hotkeys provides only hook (`useHotkeys`).
  // And as you know we can't use hooks inside loops (read "Rules of Hooks" - https://reactjs.org/docs/hooks-rules.html).
  // There is always a workaround, but sometimes it's better to avoid premature and unnecessary optimizations :)
  useHotkeys('alt+s', sidebarActions.toggle);
  useHotkeys('alt+t', themeActions.toggle);
  useHotkeys('alt+/', hotKeysDialogActions.toggle);


  var rosObjJSON = JSON.stringify(ros, null, 1);

  return (
    <Dialog fullWidth maxWidth="xs" onClose={hotKeysDialogActions.close} open={isHotKeysDialogOpen}>
      <DialogTitle>Hot Keys</DialogTitle>
      <DialogContent>
        <FlexBox alignItems="center" height={50} justifyContent="space-between">
          <Typography>Toggle Theme</Typography>
          <Button color="warning" variant="outlined" onClick={themeActions.toggle}>
            alt + t
          </Button>
        </FlexBox>
        <FlexBox alignItems="center" height={50} justifyContent="space-between">
          <Typography>Toggle Sidebar</Typography>
          <Button color="warning" variant="outlined" onClick={sidebarActions.toggle}>
            alt + s
          </Button>
        </FlexBox>
        <FlexBox alignItems="center"  justifyContent="space-between">
        <Typography>Toggle Sidebar</Typography>
        <Container>
          <div>
            <pre>{rosObjJSON}</pre>
          </div>
        </Container>

        </FlexBox>
      </DialogContent>
    </Dialog>
  );
}

export default HotKeys;
