import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

export default function Home(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Physical AI & Humanoid Robotics Textbook"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <a
              className="button button--secondary button--lg"
              href="/physical-ai-textbook/docs/intro"
            >
              Start Reading 📖
            </a>
          </div>
        </div>
      </header>

      <main>
        <section style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            <div style={{ padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <h3>🤖 ROS 2</h3>
              <p>Robotic Nervous System</p>
            </div>
            <div style={{ padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <h3>🌐 Digital Twin</h3>
              <p>Gazebo & Unity Simulation</p>
            </div>
            <div style={{ padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <h3>🧠 NVIDIA Isaac</h3>
              <p>AI Robot Brain</p>
            </div>
            <div style={{ padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <h3>🗣️ VLA</h3>
              <p>Vision-Language-Action</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
