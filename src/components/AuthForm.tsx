import React, { useState } from "react";
import { authClient } from "../lib/auth-client";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthFormProps {
  onAuth: (user: User) => void;
}

export default function AuthForm({ onAuth }: AuthFormProps) {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [background, setBackground] = useState({
    softwareExp: "",
    hardwareExp: "",
    roboticsExp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: signupError } = await authClient.signUp.email({
        email,
        password,
        name,
      } as any);

      if (signupError) {
        setError(signupError.message || signupError.statusText);
        return;
      }

      if (data?.user) {
        const user: User = {
          id: Number(data.user.id),
          name: data.user.name,
          email: data.user.email,
        };
        localStorage.setItem("user", JSON.stringify(user));
        onAuth(user);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: signinError } = await authClient.signIn.email({
        email,
        password,
      });

      if (signinError) {
        setError(signinError.message || signinError.statusText);
        return;
      }

      if (data?.user) {
        const user: User = {
          id: Number(data.user.id),
          name: data.user.name,
          email: data.user.email,
        };
        localStorage.setItem("user", JSON.stringify(user));
        onAuth(user);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        {isSignup ? "Create Account" : "Sign In"}
      </h2>

      <form
        onSubmit={isSignup ? handleSignup : handleSignin}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={isSignup}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        {isSignup && (
          <>
            <h4 style={{ margin: "8px 0 4px" }}>Background</h4>
            <select
              value={background.softwareExp}
              onChange={(e) =>
                setBackground({ ...background, softwareExp: e.target.value })
              }
              style={inputStyle}
            >
              <option value="">Software Experience</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={background.hardwareExp}
              onChange={(e) =>
                setBackground({ ...background, hardwareExp: e.target.value })
              }
              style={inputStyle}
            >
              <option value="">Hardware Experience</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={background.roboticsExp}
              onChange={(e) =>
                setBackground({ ...background, roboticsExp: e.target.value })
              }
              style={inputStyle}
            >
              <option value="">Robotics Experience</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </>
        )}

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            background: "var(--ifm-color-primary, #0056b3)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {loading
            ? "Processing..."
            : isSignup
              ? "Create Account"
              : "Sign In"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px" }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsSignup(!isSignup)}
          style={{
            background: "none",
            border: "none",
            color: "var(--ifm-color-primary, #0056b3)",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {isSignup ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "14px",
  width: "100%",
  boxSizing: "border-box",
};
