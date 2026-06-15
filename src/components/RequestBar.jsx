import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const METHOD_COLORS = {
  GET: "text-[#22c55e]",
  POST: "text-[#3b82f6]",
  PUT: "text-[#eab308]",
  PATCH: "text-[#f97316]",
  DELETE: "text-[#ef4444]",
};

const RequestBar = ({ onSend }) => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");

  const handleSend = () => {
    if (!url) return;
    onSend({ method, url });
  };

  return (
    <div className="w-full bg-[#1a1a1a] border-b border-[#2d2d2d] px-6 py-4">
      <div className="flex items-center gap-3">

        {/* select Request method */}
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className={`
            bg-[#242424] border border-[#2d2d2d] rounded-lg px-4 py-3
            font-bold text-sm cursor-pointer outline-none
            hover:border-[#22c55e] transition-colors
            ${METHOD_COLORS[method]}
          `}
        >
          {METHODS.map((m) => (
            <option key={m} value={m} className="text-white">
              {m}
            </option>
          ))}
        </select>

        {/* url input bar and either click on send or press Enter key */}
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="https://api.example.com/v1/users"
          className="
            flex-1 bg-[#242424] border border-[#2d2d2d] rounded-lg
            px-4 py-3 text-[#e5e5e5] text-sm outline-none
            placeholder-[#888888]
            hover:border-[#22c55e] focus:border-[#22c55e]
            transition-colors
          "
        />

        {/* send button */}
        <button
          onClick={handleSend}
          className="
            flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a]
            text-black font-bold px-6 py-3 rounded-lg
            transition-colors cursor-pointer
          "
        >
          <FiSend className="h-4 w-4" />
          <span>Send</span>
        </button>

      </div>
    </div>
  );
};

export default RequestBar;