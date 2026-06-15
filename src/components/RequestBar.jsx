import { FiSend } from "react-icons/fi";
import useStore from "../store/useStore";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const METHOD_COLORS = {
  GET: "text-[#22c55e]",
  POST: "text-[#3b82f6]",
  PUT: "text-[#eab308]",
  PATCH: "text-[#f97316]",
  DELETE: "text-[#ef4444]",

};

const RequestBar = ({ onSend }) => {
  const { method, setMethod, url, setUrl } = useStore();

  return (
    <div className="w-full bg-[#1a1a1a] border-b border-[#2d2d2d] px-4 py-3">
      <div className="flex items-center gap-3">
        
        {/* Method */}
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className={`bg-[#242424] border border-[#2d2d2d] rounded-lg px-3 py-2.5 font-bold text-sm cursor-pointer outline-none hover:border-[#22c55e] transition-colors ${METHOD_COLORS[method]}`}
        >
          {METHODS.map((m) => (
            <option key={m} value={m} className="text-white">{m}</option>
          ))}
        </select>

        {/* URL */}
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="https://api.example.com/v1/users"
          className="flex-1 bg-[#242424] border border-[#2d2d2d] rounded-lg px-4 py-2.5 text-[#e5e5e5] text-sm outline-none placeholder-[#888888] hover:border-[#22c55e] focus:border-[#22c55e] transition-colors"
        />

        {/* Send */}
        <button
          onClick={onSend}
          className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold px-5 py-2.5 rounded-lg transition-colors cursor-pointer text-sm"
        >
          <FiSend className="h-4 w-4" />
          Send
        </button>
      </div>
    </div>
  );
};

export default RequestBar;