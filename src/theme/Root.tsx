import React from "react";
import ChatBot from "../components/ChatBot";
import { AuthProvider } from "../components/AuthContext";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <ChatBot />
    </AuthProvider>
  );
}
