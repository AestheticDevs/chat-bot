"use client";

import { CopyIcon } from "lucide-react";
import { useState } from "react";

export default function CopyButton({ textToCopy }: any) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-5 right-5 cursor-pointer text-white/50 transition hover:text-white"
      aria-label="Copy to clipboard"
    >
      {!copied ? (
        <CopyIcon className="size-4" />
      ) : (
        <span className="relative -top-1 text-xs font-medium text-white/60">
          Copied!
        </span>
      )}
    </button>
  );
}
