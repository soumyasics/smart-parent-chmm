import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CommonHomePage } from "./pages/commonHomePage/commonHomePage.tsx";
import { CommonFooter } from "./components/common/footer/footer.tsx";
import { ParentLogin } from "./pages/parent/parentLogin/parentLogin.tsx";
import { ParentSignupForm } from "./pages/parent/parentSignup/parentSignupForm.tsx";

import "./App.css";
import { ParentSignupPage } from "./pages/parent/parentSignup/parentSignup.tsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonHomePage />} />
        {/* parent routes  */}

        <Route path="/parent/signup" element={<ParentSignupPage />} />
        <Route path="/parent/login" element={<ParentLogin />} />

        {/* testing routes  */}
        <Route path="/footer" element={<CommonFooter />} />

        <Route path="/*" element={<h1> 404 Please check your URL</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
