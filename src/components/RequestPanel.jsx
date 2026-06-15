import { FiPlus, FiTrash2 } from "react-icons/fi";
import useStore from "../store/useStore";
import { useState } from "react";

const RequestPanel = () => {
  const [activeTab, setActiveTab] = useState("Headers");
  const { headers, setHeaders, body, setBody, method } = useStore();

  const addHeader = () => setHeaders([...headers, { key: "", value: "", enabled: true }]);

  const removeHeader = (i) => setHeaders(headers.filter((_, idx) => idx !== i));

  const updateHeader = (i, field, value) => {
    const updated = [...headers];
    updated[i][field] = value;
    setHeaders(updated);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-[#2d2d2d] shrink-0">
        {["Headers", "Body"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-semibold transition-colors ${activeTab === tab ? "text-[#22c55e] border-b-2 border-[#22c55e]" : "text-[#888888] hover:text-[#e5e5e5]"}`}
          >
            {tab}
            {tab === "Headers" && (
              <span className="ml-2 text-xs bg-[#242424] px-1.5 py-0.5 rounded-full">{headers.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "Headers" && (
          <div className="flex flex-col gap-2">
            {headers.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={h.enabled}
                  onChange={(e) => updateHeader(i, "enabled", e.target.checked)}
                  className="accent-[#22c55e]"
                />
                <input
                  type="text"
                  placeholder="Key"
                  value={h.key}
                  onChange={(e) => updateHeader(i, "key", e.target.value)}
                  className="flex-1 bg-[#242424] border border-[#2d2d2d] rounded-lg px-3 py-2 text-sm text-[#e5e5e5] placeholder-[#888888] outline-none focus:border-[#22c55e] transition-colors"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={h.value}
                  onChange={(e) => updateHeader(i, "value", e.target.value)}
                  className="flex-1 bg-[#242424] border border-[#2d2d2d] rounded-lg px-3 py-2 text-sm text-[#e5e5e5] placeholder-[#888888] outline-none focus:border-[#22c55e] transition-colors"
                />
                <button onClick={() => removeHeader(i)} className="text-[#888888] hover:text-[#ef4444] transition-colors">
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addHeader}
              className="flex items-center gap-2 mt-1 px-4 py-2 border border-dashed border-[#2d2d2d] rounded-lg text-[#888888] hover:text-[#22c55e] hover:border-[#22c55e] transition-colors text-sm"
            >
              <FiPlus className="h-4 w-4" />
              Add Header
            </button>
          </div>
        )}

        {activeTab === "Body" && (
          <div className="flex flex-col gap-2 h-full">
            {method === "GET" || method === "DELETE" ? (
              <p className="text-[#888888] text-sm text-center mt-10">
                {method} requests don't have a body
              </p>
            ) : (
              <>
                <p className="text-[#888888] text-xs">JSON Body</p>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={'{\n  "key": "value"\n}'}
                  className="flex-1 w-full bg-[#242424] border border-[#2d2d2d] rounded-lg px-4 py-3 text-sm text-[#e5e5e5] placeholder-[#888888] outline-none font-mono focus:border-[#22c55e] transition-colors resize-none min-h-[300px]"
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPanel;