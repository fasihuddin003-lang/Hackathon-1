"""Seed the Qdrant vector database with textbook content."""

import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

from app.qdrant_service import ensure_collection, ingest_document

CHAPTERS = [
    {
        "id": "module1",
        "title": "Module 1: The Robotic Nervous System (ROS 2)",
        "content": """ROS 2 (Robot Operating System 2) serves as the nervous system of a robot.
A node is a process that performs computation. Robots are composed of many nodes that communicate.
Topics are buses over which nodes exchange messages using publish-subscribe pattern.
Services follow a request-response pattern. Actions are for long-running tasks with feedback.
rclpy is the Python client library for ROS 2.
URDF (Unified Robot Description Format) is an XML format for describing a robot model.""",
    },
    {
        "id": "module2",
        "title": "Module 2: The Digital Twin (Gazebo & Unity)",
        "content": """Digital twins are virtual replicas of physical robots and environments.
Gazebo is a high-fidelity 3D robotics simulator with physics engines: ODE, Bullet, DART.
Gazebo simulates gravity, collisions, and joint dynamics.
URDF is used for ROS while SDF (Simulation Description Format) is used by Gazebo.
Unity provides high-fidelity rendering for photorealistic environments and human-robot interaction.""",
    },
    {
        "id": "module3",
        "title": "Module 3: The AI-Robot Brain (NVIDIA Isaac)",
        "content": """NVIDIA Isaac provides a platform for AI-powered robotics.
Isaac Sim is a photorealistic simulation environment built on NVIDIA Omniverse.
Features: physics simulation, synthetic data generation, domain randomization, ray tracing.
Isaac ROS provides hardware-accelerated ROS 2 packages including VSLAM and Nav2.
Nav2 handles path planning and obstacle avoidance for bipedal movement.""",
    },
    {
        "id": "module4",
        "title": "Module 4: Vision-Language-Action (VLA)",
        "content": """Vision-Language-Action models combine computer vision, natural language, and motor control.
Whisper is OpenAI's speech recognition model for voice-to-text conversion.
LLMs can translate natural language commands into sequences of ROS 2 actions.
Multi-modal interaction combines speech, gesture, and vision.
The capstone project involves an autonomous humanoid robot that receives voice commands,
plans paths, navigates obstacles, identifies objects, and manipulates them.""",
    },
    {
        "id": "week1-2",
        "title": "Weeks 1-2: Introduction to Physical AI",
        "content": """Foundations of Physical AI and embodied intelligence.
From digital AI to robots that understand physical laws.
Overview of humanoid robotics landscape.
Sensor systems: LIDAR, cameras, IMUs, force/torque sensors.""",
    },
    {
        "id": "week3-5",
        "title": "Weeks 3-5: ROS 2 Fundamentals",
        "content": """ROS 2 architecture and core concepts.
Nodes, topics, services, and actions.
Building ROS 2 packages with Python.
Launch files and parameter management.""",
    },
    {
        "id": "hardware",
        "title": "Hardware Requirements",
        "content": """GPU: RTX 4070 Ti (12GB VRAM) or higher. RTX 3090/4090 (24GB) ideal.
CPU: Intel Core i7 (13th Gen+) or AMD Ryzen 9.
RAM: 64 GB DDR5 (32 GB minimum).
OS: Ubuntu 22.04 LTS.
Edge AI: NVIDIA Jetson Orin Nano (8GB) or Orin NX (16GB).
Camera: Intel RealSense D435i or D455.
Robot options: Unitree Go2 Edu ($1,800-$3,000), Unitree G1 ($16k).""",
    },
]


def main():
    print("Ensuring Qdrant collection exists...")
    ensure_collection()
    print(f"Ingesting {len(CHAPTERS)} chapters...")
    for chapter in CHAPTERS:
        print(f"  Ingesting: {chapter['title']}")
        ingest_document(
            doc_id=chapter["id"],
            title=chapter["title"],
            content=chapter["content"],
            metadata={"source": "physical-ai-textbook"},
        )
    print("Done! All chapters ingested.")


if __name__ == "__main__":
    main()
