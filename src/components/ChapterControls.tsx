import React, { useState, useEffect } from "react";
import PersonalizeButton from "./PersonalizeButton";
import TranslateButton from "./TranslateButton";

interface ChapterControlsProps {
  chapterId: string;
}

export default function ChapterControls({ chapterId }: ChapterControlsProps) {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "8px",
        padding: "12px 16px",
        marginBottom: "24px",
        background: "var(--ifm-color-primary-contrast-background, #f8f9fa)",
        borderRadius: "8px",
        border: "1px solid var(--ifm-color-primary-contrast-border, #e0e0e0)",
      }}
    >
      <span style={{ fontWeight: 600, fontSize: "14px" }}>
        {user ? `Welcome, ${user.name}!` : "Sign in to personalize content"}
      </span>
      <div style={{ display: "flex", gap: "8px" }}>
        {user && <PersonalizeButton chapterId={chapterId} />}
        <TranslateButton chapterId={chapterId} />
      </div>
    </div>
  );
}
