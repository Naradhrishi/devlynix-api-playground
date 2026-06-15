import { create } from "zustand";

const useStore = create((set) => ({
  // Request state
  method: "GET",
  url: "",
  headers: [{ key: "Content-Type", value: "application/json", enabled: true }],
  body: "",

  // Response state
  response: null,
  loading: false,

  // History
  history: JSON.parse(localStorage.getItem("api-history") || "[]"),

  // Actions
  setMethod: (method) => set({ method }),
  setUrl: (url) => set({ url }),
  setHeaders: (headers) => set({ headers }),
  setBody: (body) => set({ body }),
  setLoading: (loading) => set({ loading }),
  setResponse: (response) => set({ response }),

  addToHistory: (item) =>
    set((state) => {
      const newHistory = [item, ...state.history.slice(0, 19)];
      localStorage.setItem("api-history", JSON.stringify(newHistory));
      return { history: newHistory };
    }),

  clearHistory: () => {
    localStorage.removeItem("api-history");
    set({ history: [] });
  },
}));

export default useStore;