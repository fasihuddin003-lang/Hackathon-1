# Module 2: The Digital Twin (Gazebo & Unity)

**Focus: Physics simulation and environment building.**

## Overview

Digital twins are virtual replicas of physical robots and environments. They allow us to simulate physics, test control algorithms, and train AI models without risking real hardware.

## Gazebo Simulation

Gazebo is a high-fidelity 3D robotics simulator with:
- Physics engines (ODE, Bullet, DART)
- Sensor simulation (LiDAR, cameras, IMUs)
- ROS 2 integration via `gazebo_ros_pkgs`

### Setting Up a Gazebo World

```bash
# Launch an empty world
gazebo --verbose worlds/empty.world
```

### Simulating Physics

Gazebo simulates:
- **Gravity**: 9.81 m/s² downward
- **Collisions**: Object interactions with friction
- **Joint dynamics**: Motor torques and forces

### URDF and SDF

While URDF is used for ROS, Gazebo uses **SDF** (Simulation Description Format) for more detailed simulation properties:

```xml
<sdf version='1.7'>
  <model name='humanoid'>
    <link name='torso'>
      <pose>0 0 0.8 0 0 0</pose>
      <inertial>
        <mass>15.0</mass>
      </inertial>
    </link>
  </model>
</sdf>
```

### Simulating Sensors

```xml
<!-- LiDAR Sensor -->
<sensor type="ray" name="lidar">
  <ray>
    <scan><horizontal samples="360" resolution="1"/></scan>
    <range min="0.1" max="30.0"/>
  </ray>
</sensor>

<!-- Depth Camera -->
<sensor type="depth" name="depth_camera">
  <camera>
    <horizontal_fov>1.047</horizontal_fov>
    <image width="640" height="480"/>
  </camera>
</sensor>
```

## Unity for Robot Visualization

Unity provides high-fidelity rendering for:
- Photorealistic environments
- Human-robot interaction visualization
- Advanced lighting and shadows

Unity connects to ROS 2 via **ROS-TCP-Endpoint** or **Unity Robotics Hub**, enabling real-time visualization of robot states.

## Summary

Digital twins in Gazebo and Unity provide safe, cost-effective environments for developing and testing physical AI systems before deployment on real hardware.
