import axios from "axios";
import HeroNavbar from "./components/HeroNavbar";
import RequestBar from "./components/RequestBar";
import HistorySidebar from "./components/HistorySidebar";
import RequestPanel from "./components/RequestPanel";
import ResponsePanel from "./components/ResponsePanel";
import useStore from "./store/useStore";

function App() {
  const {
    method,
    url,
    headers,
    body,
    setResponse,
    setLoading,
    addToHistory,
    response,
    loading,
  } = useStore();

  const handleSend = async () => {
    if (!url) return;
    setLoading(true);
    setResponse(null);
    const startTime = Date.now();

    // Build headers object from array
    const headersObj = {};
    headers.forEach(({ key, value, enabled }) => {
      if (enabled && key) headersObj[key] = value;
    });

    try {
      const res = await axios({
        method,
        url,
        headers: headersObj,
        data:
          method !== "GET" && method !== "DELETE"
            ? JSON.parse(body || "{}")
            : undefined,
      });

      const result = {
        status: res.status,
        statusText: res.statusText,
        time: Date.now() - startTime,
        size: JSON.stringify(res.data).length,
        data: res.data,
        headers: res.headers,
        success: true,
      };

      setResponse(result);
      addToHistory({
        method,
        url,
        status: res.status,
        time: result.time,
        headers: headers,
        body: body,
      });
    } catch (err) {
      const result = {
        status: err.response?.status || "ERR",
        statusText: err.response?.statusText || "Request Failed",
        time: Date.now() - startTime,
        size: 0,
        data: err.response?.data || { error: err.message },
        headers: err.response?.headers || {},
        success: false,
      };
      setResponse(result);
      addToHistory({
        method,
        url,
        status: result.status,
        time: result.time,
        headers: headers,
        body: body,
      });
    }

    setLoading(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#1a1a1a]">
      {/* Hero and Navbar */}
      <HeroNavbar />

      {/* Request Bar */}
      <RequestBar onSend={handleSend} />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <HistorySidebar />

        {/* Middle Panel */}
        <div className="w-[35%] border-r border-[#2d2d2d] overflow-hidden flex flex-col">
          <RequestPanel />
        </div>

        {/* Right Panel */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <ResponsePanel />
        </div>
      </div>
    </div>
  );
}

export default App;
