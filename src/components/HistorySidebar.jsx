import { useState } from "react";
import {
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiTrash2,
} from "react-icons/fi";
import useStore from "../store/useStore";

const METHOD_COLORS = {
  GET: "text-[#22c55e]",
  POST: "text-[#3b82f6]",
  PUT: "text-[#eab308]",
  PATCH: "text-[#f97316]",
  DELETE: "text-[#ef4444]",
};

const HistorySidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { history, clearHistory, setUrl, setMethod, setBody, setHeaders } = useStore();

  const loadRequest = (item) => {
    setUrl(item.url);
    setMethod(item.method);
    if (item.body) setBody(item.body);
    if (item.headers) setHeaders(item.headers);
  };

  return (
    <div
      className={`flex flex-col bg-[#1a1a1a] border-r border-[#2d2d2d] transition-all duration-300 shrink-0 ${isOpen ? "w-56" : "w-12"}`}
    >
      {/* Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center py-4 text-[#888888] hover:text-[#22c55e] border-b border-[#2d2d2d] transition-colors w-full"
      >
        {isOpen ? (
          <div className="flex items-center gap-2 px-3 w-full">
            <FiClock className="shrink-0" />
            <span className="text-sm font-semibold text-[#e5e5e5]">
              History
            </span>
            <span className="ml-auto text-xs bg-[#22c55e] text-black px-1.5 py-0.5 rounded-full font-bold">
              {history.length}
            </span>
            <FiChevronLeft className="shrink-0" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <FiClock />
            <FiChevronRight className="h-3 w-3" />
          </div>
        )}
      </button>

      {/* List */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2 px-4">
              <FiClock className="text-[#888888] h-6 w-6" />
              <p className="text-[#888888] text-xs text-center">
                No requests yet
              </p>
            </div>
          ) : (
            history.map((item, index) => (
              <div
                key={index}
                onClick={() => loadRequest(item)}
                className="flex flex-col gap-1 px-3 py-2 border-b border-[#2d2d2d] hover:bg-[#242424] cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${METHOD_COLORS[item.method] || "text-white"}`}
                  >
                    {item.method}
                  </span>
                  <span
                    className={`text-xs font-bold ${item.status >= 400 ? "text-[#ef4444]" : "text-[#22c55e]"}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-[#888888] text-xs truncate">{item.url}</p>
                <p className="text-[#888888] text-xs">{item.time}ms</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Clear */}
      {isOpen && history.length > 0 && (
        <button
          onClick={clearHistory}
          className="flex items-center justify-center gap-2 py-3 text-[#ef4444] hover:bg-[#242424] border-t border-[#2d2d2d] text-xs transition-colors"
        >
          <FiTrash2 className="h-3 w-3" />
          Clear History
        </button>
      )}
    </div>
  );
};

export default HistorySidebar;
