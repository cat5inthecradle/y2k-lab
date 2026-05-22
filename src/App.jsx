import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Lesson from "./pages/Lesson";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lesson/:slug" element={<Lesson />} />
      </Routes>
    </HashRouter>
  );
}
