import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CommonHomePage } from "./pages/commonHomePage/commonHomePage.tsx";
import { CommonFooter } from "./components/common/footer/footer.tsx";
import { ParentLogin } from "./pages/parent/parentLogin/parentLogin.tsx";

import { ParentSignupPage } from "./pages/parent/parentSignup/parentSignup.tsx";
import { LandingPageNavbar } from "./components/landingPage/landingPageNavbar/landingPageNavbar.tsx";
import "./App.css";
import { ParentHome } from "./pages/parent/parentHome/parentHome.tsx";
import { HPLogin } from "./pages/hp/hpLogin/hpLogin.tsx";
import { HPSignup } from "./pages/hp/hpSignup/hpSignup.tsx";
import { HpHome } from "./pages/hp/hpHome/hpHome.tsx";
import { HPProfilePage } from "./pages/hp/hpProfile/hpProfilePage.tsx";
import {AddTodo} from "./pages/parent/addTodo/addTodo.tsx"
import { DisplayTodo } from "./pages/parent/displayTodo/displayTodo.tsx";
function App() {
  return (
    <BrowserRouter basename="child_crescendo">
      <Routes>
        <Route path="/" element={<CommonHomePage />} />

        {/* common pages  */}

        {/* parent routes  */}

        <Route path="/parent/signup" element={<ParentSignupPage />} />
        <Route path="/parent/login" element={<ParentLogin />} />
        <Route path="/parent/home" element={<ParentHome />} />
        <Route path="/parent/add-todo" element={<AddTodo />} />
        <Route path="/parent/display-todo" element={<DisplayTodo />} />

        {/* health professional routes */}
        <Route path="/hp/login" element={<HPLogin />} />
        <Route path="/hp/signup" element={<HPSignup />} />
        <Route path="/hp/home" element={<HpHome />} />
        <Route path="/hp/profile" element={<HPProfilePage />} />

        {/* testing routes  */}
        <Route path="/footer" element={<CommonFooter />} />

        <Route path="/*" element={<h1> 404 Please check your URL</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
