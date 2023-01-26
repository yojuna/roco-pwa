## usage

launch backend ros ; turtlebot3 slam simulation and world + rosbridge_server
```bash
ros && \
    cd /home/nemo/code/repos/rwth/igmr/rp/code/robot_control/turtlebot/tb3_sim/catkin_ws && \
    export TURTLEBOT3_MODEL=burger && \
    source devel/setup.bash && \
    roslaunch src/turtlebot3_simulations/launch/tb3_nav_slam_sim.launch
```

start the ngrok tunnel
```bash
ngrok http 9090 --host-header=localhost:9090
```
note: update ngrok url in 'src/config/index.ts' in the variable 'ngrok_uri' (around line 55)


start the app server
```bash
cd /home/nemo/code/repos/rwth/igmr/rp/code/app_v2/roco-pwa-v3/ && \
    conda activate robot_rig && \
    npm run dev
```

turtlebot3 teleop
```bash
ros && \
    export TURTLEBOT3_MODEL=burger && \
    roslaunch turtlebot3_teleop turtlebot3_teleop_key.launch
```

react dev tools
```bash
cd /home/nemo/code/repos/rwth/igmr/rp/code/app_v2/roco-pwa-v3/ && \
    conda activate robot_rig && \
    react-devtools
```

Install dependencies:

```bash
npm install # or yarn
```

In order to run it in development, run:

```bash
npm run dev # or yarn dev
```

In order to do a production build, run:

```bash
npm run build # yarn build
```

There are two more scripts:

`preview` and `serve`

- `preview` command will boot up local static web server that serves the files from `dist` folder. It's an easy way to check if the production build looks OK in your local environment.
- `serve` is the same, but with HTTPS. It's handy for testing your PWA capabilities in your local environment.

