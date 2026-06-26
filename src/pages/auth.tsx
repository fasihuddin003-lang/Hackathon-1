import React from "react";
import Layout from "@theme/Layout";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../components/AuthContext";

export default function AuthPage() {
  const { user, setUser } = useAuth();

  if (user) {
    return (
      <Layout title="Account" description="Your account">
        <main style={{ padding: "40px 20px", textAlign: "center" }}>
          <h1>Welcome, {user.name}!</h1>
          <p style={{ color: "#666" }}>You are signed in as {user.email}</p>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
            }}
            style={{
              padding: "10px 20px",
              background: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "16px",
            }}
          >
            Sign Out
          </button>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title="Sign Up" description="Create your account">
      <main>
        <AuthForm onAuth={setUser} />
      </main>
    </Layout>
  );
}
