import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CommonHomePage } from "./pages/commonHomePage/commonHomePage.tsx";
import { CommonFooter } from "./components/common/footer/footer.tsx";
import { ParentLogin } from "./pages/parent/parentLogin/parentLogin.tsx";
import { ParentSignupPage } from "./pages/parent/parentSignup/parentSignup.tsx";
import { ParentHome } from "./pages/parent/parentHome/parentHome.tsx";
import { HPLogin } from "./pages/hp/hpLogin/hpLogin.tsx";
import { HPSignup } from "./pages/hp/hpSignup/hpSignup.tsx";
import { HpHome } from "./pages/hp/hpHome/hpHome.tsx";
import { HPProfilePage } from "./pages/hp/hpProfile/hpProfilePage.tsx";
import { AddTodo } from "./pages/parent/addTodo/addTodo.tsx";
import { DisplayTodo } from "./pages/parent/displayTodo/displayTodo.tsx";
import { ParentForgotPassword } from "./pages/parent/forgotPassword/forgotPassword.tsx";
import "./App.css";
import { RegisterChild } from "./pages/parent/registerChild/registerChild.tsx";
import { ParentProfilePage } from "./pages/parent/parentProfile/parentProfilePage.tsx";
function App() {
  return (
    <BrowserRouter basename="child_crescendo">
      <Routes>
        <Route path="/" element={<CommonHomePage />} />

        {/* parent routes  */}

        <Route path="/parent/signup" element={<ParentSignupPage />} />
        <Route path="/parent/login" element={<ParentLogin />} />
        <Route path="/parent/home" element={<ParentHome />} />
        <Route path="/parent/add-todo" element={<AddTodo />} />
        <Route path="/parent/display-todo" element={<DisplayTodo />} />
        <Route path="/parent/profile" element={<ParentProfilePage />} />
        <Route path="/parent/register-child" element={<RegisterChild />} />
        <Route
          path="/parent/forgot-password"
          element={<ParentForgotPassword />}
        />

        {/* health professional routes */}
        <Route path="/hp/login" element={<HPLogin />} />
        <Route path="/hp/signup" element={<HPSignup />} />
        <Route path="/hp/home" element={<HpHome />} />
        <Route path="/hp/profile" element={<HPProfilePage />} />
        {/* common pages  */}
        <Route path="/footer" element={<CommonFooter />} />

        {/* testing routes  */}
        <Route path="/*" element={<h1> 404 Please check your URL</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
