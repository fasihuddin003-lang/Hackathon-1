import React, { useState, useEffect } from "react";

interface PersonalizeButtonProps {
  chapterId: string;
}

export default function PersonalizeButton({ chapterId }: PersonalizeButtonProps) {
  const [personalized, setPersonalized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserId(user.id);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const handlePersonalize = async () => {
    if (!userId) {
      alert("Please sign in first to personalize content.");
      return;
    }

    setLoading(true);

    try {
      const userStr = localStorage.getItem("user");
      const background = userStr ? JSON.parse(userStr).background : {};

      const res = await fetch("http://localhost:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Personalize the chapter "${chapterId}" for a user with background: ${JSON.stringify(background)}. Explain how this relates to their experience level.`,
          user_id: userId,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setPersonalized(true);
      alert(data.answer);
    } catch {
      alert("Could not personalize content. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePersonalize}
      disabled={loading || personalized}
      style={{
        padding: "8px 16px",
        background: personalized ? "#4caf50" : "var(--ifm-color-primary, #0056b3)",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "16px",
      }}
    >
      {loading ? "⏳" : personalized ? "✓" : "🎯"}
      {personalized ? "Personalized" : "Personalize This Chapter"}
    </button>
  );
}
