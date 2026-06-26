import React, { useState, useEffect } from "react";

interface TranslateButtonProps {
  chapterId: string;
}

export default function TranslateButton({ chapterId }: TranslateButtonProps) {
  const [isUrdu, setIsUrdu] = useState(false);

  useEffect(() => {
    setIsUrdu(window.location.pathname.startsWith("/ur/"));
  }, []);

  const handleTranslate = () => {
    const currentUrl = window.location.pathname;
    if (currentUrl.startsWith("/ur/")) {
      window.location.href = currentUrl.replace("/ur/", "/en/");
    } else {
      window.location.href = currentUrl.replace("/en/", "/ur/");
    }
  };

  return (
    <button
      onClick={handleTranslate}
      style={{
        padding: "8px 16px",
        background: "transparent",
        color: "var(--ifm-color-primary, #0056b3)",
        border: "1px solid var(--ifm-color-primary, #0056b3)",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "16px",
        marginLeft: "8px",
      }}
    >
      🌐 {isUrdu ? "English" : "اردو"}
    </button>
  );
}
