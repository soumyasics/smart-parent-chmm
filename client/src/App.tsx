import { CommonHomePage } from "./pages/common/CommonHomePage/CommonHomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonHomePage />} />
        
        <Route path="/*" element={<h1> 404 Please check your URL</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
