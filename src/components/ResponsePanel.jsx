import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useStore from "../store/useStore";

SyntaxHighlighter.registerLanguage("json", json);

const ResponsePanel = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("Body");
  const { response, loading } = useStore();

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(response?.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Meta Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d2d2d] shrink-0">
        <div className="flex items-center gap-3">
          {response ? (
            <>
              <span className={`text-xs font-bold px-2 py-1 rounded ${response.success ? "text-[#22c55e] bg-[#22c55e]/10" : "text-[#ef4444] bg-[#ef4444]/10"}`}>
                {response.status} {response.statusText}
              </span>
              <span className="text-[#888888] text-xs">⏱ {response.time}ms</span>
              <span className="text-[#888888] text-xs">📦 {(response.size / 1024).toFixed(2)} KB</span>
            </>
          ) : (
            <span className="text-[#888888] text-xs">Send a request to see response</span>
          )}
        </div>
        {response && (
          <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-[#22c55e] transition-colors">
            {copied ? <><FiCheck className="h-3 w-3" />Copied!</> : <><FiCopy className="h-3 w-3" />Copy</>}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2d2d2d] shrink-0">
        {["Body", "Headers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-semibold transition-colors ${activeTab === tab ? "text-[#22c55e] border-b-2 border-[#22c55e]" : "text-[#888888] hover:text-[#e5e5e5]"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content — scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && (
          <div className="flex items-center justify-center h-32 gap-3">
            <div className="h-4 w-4 rounded-full border-2 border-[#22c55e] border-t-transparent animate-spin" />
            <span className="text-[#888888] text-sm">Sending request...</span>
          </div>
        )}

        {!loading && !response && (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <p className="text-[#888888] text-sm">No response yet</p>
            <p className="text-[#888888] text-xs">Enter a URL and hit Send</p>
          </div>
        )}

        {!loading && response && activeTab === "Body" && (
          <SyntaxHighlighter
            language="json"
            style={atomOneDark}
            customStyle={{ background: "#242424", borderRadius: "8px", fontSize: "12px", padding: "16px", margin: 0 }}
          >
            {JSON.stringify(response.data, null, 2)}
          </SyntaxHighlighter>
        )}

        {!loading && response && activeTab === "Headers" && (
          <div className="flex flex-col gap-2">
            {Object.entries(response.headers).map(([key, value]) => (
              <div key={key} className="flex gap-4 px-3 py-2 bg-[#242424] rounded-lg">
                <span className="text-[#22c55e] text-xs font-mono font-bold min-w-40">{key}</span>
                <span className="text-[#e5e5e5] text-xs font-mono break-all">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsePanel;