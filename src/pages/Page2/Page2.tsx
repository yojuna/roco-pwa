import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

// import { Grid, makeStyles } from '@material-ui/core';

import { makeStyles } from '@mui/material';
import Grid from '@mui/material/Grid';
// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Container } from '@mui/material';
// import Chart

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function NestedGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={5} lg={4}>
          <Item>Email subscribe section</Item>
        </Grid>
        <Grid container xs={12} md={7} lg={8} spacing={4}>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-a"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Category A
              </Box>
              <Box component="ul" aria-labelledby="category-a" sx={{ pl: 2 }}>
                <li>Link 1.1</li>
                <li>Link 1.2</li>
                <li>Link 1.3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-b"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Category B
              </Box>
              <Box component="ul" aria-labelledby="category-b" sx={{ pl: 2 }}>
                <li>Link 2.1</li>
                <li>Link 2.2</li>
                <li>Link 2.3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-c"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Category C
              </Box>
              <Box component="ul" aria-labelledby="category-c" sx={{ pl: 2 }}>
                <li>Link 3.1</li>
                <li>Link 3.2</li>
                <li>Link 3.3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="category-d"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Category D
              </Box>
              <Box component="ul" aria-labelledby="category-d" sx={{ pl: 2 }}>
                <li>Link 4.1</li>
                <li>Link 4.2</li>
                <li>Link 4.3</li>
              </Box>
            </Item>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
          sx={{ fontSize: '12px' }}
        >
          <Grid sx={{ order: { xs: 2, sm: 1 } }}>
            <Item>© Copyright</Item>
          </Grid>
          <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
            <Grid>
              <Item>Link A</Item>
            </Grid>
            <Grid>
              <Item>Link B</Item>
            </Grid>
            <Grid>
              <Item>Link C</Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

// const useStyles = makeStyles(theme => ({
//   root: {
//     height: '100vh',
//     width: '100vw',
//     position: 'fixed',
//     overflow: 'auto'
//   },
//   main: {
//     height: '60%',
//     width: '100%'
//   },
//   secondary: {
//     height: '30%',
//     width: '100%'
//   }
// }));

// function MyComponent() {
//   const classes = useStyles();

//   return (
//     <Grid container className={classes.root}>
//       <Grid item xs={12} className={classes.main}>
//         <Paper> Main Content </Paper>
//       </Grid>
//       <Grid item xs={12} className={classes.secondary}>
//         <Paper> Secondary Content </Paper>
//       </Grid>
//     </Grid>
//   );
// }


function Page2() {
  return (
    <>
      <Meta title="page 2" />
      <FullSizeCenteredFlexBox>
        <NestedGrid/>
        {/* <MyComponent/> */}
      </FullSizeCenteredFlexBox>
      {/* <NestedGrid/> */}
    </>
  );
}

export default Page2;



{/* <Grid>
<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        Chart
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '50vh',
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        Recent Deposits
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        // Recent Orders
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
    </Grid> */}





    
    
    