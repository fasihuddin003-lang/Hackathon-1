# Hardware Requirements

## Overview

This course sits at the intersection of three heavy computational loads:
- Physics Simulation (Isaac Sim/Gazebo)
- Visual Perception (SLAM/Computer Vision)
- Generative AI (LLMs/VLA)

## 1. The "Digital Twin" Workstation

| Component | Requirement | Notes |
|-----------|-------------|-------|
| GPU | RTX 4070 Ti (12GB VRAM) or higher | RTX 3090/4090 (24GB) ideal |
| CPU | Intel Core i7 (13th Gen+) / AMD Ryzen 9 | Physics calculations are CPU-intensive |
| RAM | 64 GB DDR5 (32 GB minimum) | Complex scenes require more memory |
| OS | Ubuntu 22.04 LTS | ROS 2 is native to Linux |

## 2. The "Physical AI" Edge Kit

| Component | Model | Purpose |
|-----------|-------|---------|
| Brain | NVIDIA Jetson Orin Nano (8GB) / Orin NX (16GB) | Industry standard for embodied AI |
| Eyes | Intel RealSense D435i or D455 | RGB and Depth data for VSLAM |
| Balance | Generic USB IMU (BNO055) | Inertial measurement |
| Voice | USB Microphone/Speaker array (ReSpeaker) | Voice-to-Action integration |

## 3. Robot Options

### Option A: Proxy Approach (Budget)
- **Unitree Go2 Edu** (~$1,800-$3,000)
- Quadruped platform with excellent ROS 2 support

### Option B: Miniature Humanoid
- **Unitree G1** (~$16k) or **Robotis OP3** (~$12k)
- **Budget**: Hiwonder TonyPi Pro (~$600)

### Option C: Premium Lab
- **Unitree G1 Humanoid** for sim-to-real deployment

## Summary Architecture

| Component | Hardware | Function |
|-----------|----------|----------|
| Sim Rig | PC with RTX 4080 + Ubuntu 22.04 | Isaac Sim, Gazebo, Unity, LLM training |
| Edge Brain | Jetson Orin Nano | Inference stack deployment |
| Sensors | RealSense Camera + LiDAR | Real-world data input |
| Actuator | Unitree Go2 or G1 (Shared) | Motor command execution |
