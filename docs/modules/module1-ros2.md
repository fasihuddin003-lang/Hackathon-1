# Module 1: The Robotic Nervous System (ROS 2)

**Focus: Middleware for robot control.**

## Overview

ROS 2 (Robot Operating System 2) serves as the nervous system of a robot. It provides the communication infrastructure that allows different parts of a robot — sensors, actuators, and AI agents — to talk to each other.

## Key Concepts

### ROS 2 Nodes

A node is a process that performs computation. Robots are composed of many nodes that communicate with each other. For example:
- A camera node publishes image data
- A vision node processes images and publishes object detections
- A motor controller node subscribes to movement commands

### Topics

Topics are buses over which nodes exchange messages. They follow a publish-subscribe pattern:
- **Publishers** send data on a topic
- **Subscribers** receive data from a topic

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Talker(Node):
    def __init__(self):
        super().__init__('talker')
        self.publisher = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello from ROS 2!'
        self.publisher.publish(msg)
```

### Services

Services follow a request-response pattern, useful for tasks that need a reply:
- A node sends a request
- Another node processes it and sends back a response

### Actions

Actions are for long-running tasks with feedback:
- Goal: what you want to achieve
- Feedback: progress updates
- Result: the final outcome

## Bridging Python Agents to ROS Controllers (rclpy)

`rclpy` is the Python client library for ROS 2. It allows Python-based AI agents to interface directly with ROS 2 controllers:

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class AIAgent(Node):
    def __init__(self):
        super().__init__('ai_agent')
        self.cmd_pub = self.create_publisher(Twist, '/cmd_vel', 10)

    def send_movement_command(self, linear_x, angular_z):
        cmd = Twist()
        cmd.linear.x = linear_x
        cmd.angular.z = angular_z
        self.cmd_pub.publish(cmd)
```

## URDF (Unified Robot Description Format)

URDF is an XML format for describing a robot model:
- Links (rigid bodies)
- Joints (connections between links)
- Kinematics (how joints move)

```xml
<robot name="simple_robot">
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.4 0.4 0.1"/>
      </geometry>
    </visual>
  </link>
  <joint name="base_to_wheel" type="continuous">
    <parent link="base_link"/>
    <child link="wheel"/>
    <origin xyz="0.2 0 0"/>
  </joint>
</robot>
```

## Summary

ROS 2 provides the communication backbone for modern robotics. Mastering nodes, topics, services, and URDF is essential for building any robotic system.
