// src/components/LoadingSpinner.jsx
import React from "react";

export default function LoadingSpinner({ size = "md", color = "emerald", overlay = false }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10",
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full border-4 border-${color}-500 border-t-transparent ${sizeClasses[size]}`}
    />
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}
