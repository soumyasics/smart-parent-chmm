import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CommonHomePage } from "./pages/commonHomePage/commonHomePage.tsx";
import { CommonFooter } from "./components/common/footer/footer.tsx";
import { ParentLogin } from "./pages/parent/parentLogin/parentLogin.tsx";
import { ParentSignupPage } from "./pages/parent/parentSignup/parentSignup.tsx";
import { ParentHome } from "./pages/parent/parentHome/parentHome.tsx";
import { HPLogin } from "./pages/hp/hpLogin/hpLogin.tsx";
import { HPSignup } from "./pages/hp/hpSignup/hpSignup.tsx";
import { HpHome } from "./pages/hp/hpHome/hpHome.tsx";
import { AddTodo } from "./pages/parent/addTodo/addTodo.tsx";
import { DisplayTodo } from "./pages/parent/displayTodo/displayTodo.tsx";
import { ParentForgotPassword } from "./pages/parent/forgotPassword/forgotPassword.tsx";
import { RegisterChild } from "./pages/parent/registerChild/registerChild.tsx";
import { ParentProfilePage } from "./pages/parent/parentProfile/parentProfilePage.tsx";
import { ParentResetPassword } from "./pages/parent/resetPassword/resetPassword.tsx";
import { AdminLogin } from "./pages/admin/AdminLogin/AdminLogin.tsx";
import { AdminDashboard } from "./pages/admin/AdminDashboard/adminDashboard.tsx";
import { VCHome } from "./pages/vc/vcHome/vcHome.tsx";
import { VCSignup } from "./pages/vc/vcSignup/vcSignup.tsx";
import { VCLogin } from "./pages/vc/vcLogin/vcLogin.tsx";
import { ProtectParentLoginPage } from "./components/common/protectRoutes/protectLoginPage.tsx";
import { VCProfilePage } from "./pages/vc/vcProfile/profilePage.tsx";
import { ChatWithParent } from "./pages/vc/chatWithParent/chatWithParent.tsx";
import { ViewVaccinationCenters } from "./pages/parent/viewVaccincationCenters/viewVaccinnationCenteres.tsx";
import { ChatWithVC } from "./pages/parent/chatWithVC/chatWithVC.tsx";
import { VCForgotPassword } from "./pages/vc/forgotPassword/forgotPassword.tsx";
import { ProtectAdminRoutes } from "./components/Admin/protectAdminRoute/protectAdminRoutes.tsx";
import { HPProfilePage } from "./pages/hp/hpProfile/profilePage.tsx";
import { HPForgotPassword } from "./pages/hp/forgotPassword/forgotPassword.tsx";
import { AWSignup } from "./pages/ashaWorker/awSignup/awSignup.tsx";
import { AWLogin } from "./pages/ashaWorker/awLogin/awLogin.tsx";
import { AWHome } from "./pages/ashaWorker/awHome/awHome.tsx";
import { AWForgotPassword } from "./pages/ashaWorker/forgotPassword/forgotPassword.tsx";
import { AWProfilePage } from "./pages/ashaWorker/awProfile/profilePage.tsx";
import { Toaster } from "react-hot-toast";
import { ViewVCDeatils } from "./pages/parent/viewVaccincationCenters/viewVCDetails.tsx";
import { ViewHP } from "./pages/parent/viewHP/viewHP.tsx";
import { ViewAW } from "./pages/parent/viewAW/viewAW.tsx";
import { BookVaccine } from "./components/parent/bookVaccine/bookVaccine.tsx";
import { AddVaccines } from "./pages/vc/addVaccines/addVaccines.tsx";
import { VaccinationChart } from "./components/parent/vaccinationChart/vaccinationChart.tsx";
import { ViewHPDeatils } from "./pages/parent/viewHP/viewHPDetails.tsx";
import { PaymentPage } from "./components/common/subscribePaymentPage/subscribePaymentPage.tsx";
import { UploadVideo } from "./pages/hp/uploadVideo/uploadVideo.tsx";
import { WatchTutorialFullScreen } from "./components/hp/view-tutorials/viewFullScreen.tsx";
import { ParentWatchTutorialFullScreen } from "./components/parent/view-tutorials/viewFullScreen.tsx";
import { HPCreateBlog } from "./pages/hp/hpCreateBlog/createBlog.tsx";
import { FullBlog } from "./pages/hp/viewBlogs/fullBlog.tsx";
import { ParentFullBlog } from "./components/parent/viewBlogs/parentFullBlog.tsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="child_crescendo">
      <Toaster />
      <Routes>
        <Route path="/" element={<CommonHomePage />} />

        {/* parent routes  */}

        <Route path="/parent/signup" element={<ParentSignupPage />} />
        <Route
          path="/parent/login"
          element={
            <ProtectParentLoginPage>
              <ParentLogin />
            </ProtectParentLoginPage>
          }
        />
        <Route path="/parent/home" element={<ParentHome />} />
        <Route path="/parent/add-todo" element={<AddTodo />} />
        <Route path="/parent/display-todo" element={<DisplayTodo />} />
        <Route path="/parent/profile" element={<ParentProfilePage />} />
        <Route path="/parent/register-child" element={<RegisterChild />} />
        <Route path="/parent/chat-vc" element={<ChatWithVC />} />
        <Route path="/parent/view-aw" element={<ViewAW />} />
        <Route path="/parent/view-vc" element={<ViewVaccinationCenters />} />
        <Route path="/parent/view-vc/:id" element={<ViewVCDeatils />} />
        <Route path="/parent/view-hp" element={<ViewHP />} />
        <Route path="/parent/view-hp/:id" element={<ViewHPDeatils />} />
        <Route path="/parent/book-vaccine" element={<BookVaccine />} />
        <Route
          path="/parent/reset-password"
          element={<ParentResetPassword />}
        />
        <Route
          path="/parent/forgot-password"
          element={<ParentForgotPassword />}
        />

        <Route path="/parent/vc-chart" element={<VaccinationChart />} />
        <Route path="/parent/payment/:id" element={<PaymentPage />} />
        <Route path="/parent/full-screen/:id" element={<ParentWatchTutorialFullScreen />} />
        <Route path="/parent/blog/:id" element={<ParentFullBlog />} />

        {/* health professional routes */}
        <Route path="/hp/login" element={<HPLogin />} />
        <Route path="/hp/signup" element={<HPSignup />} />
        <Route path="/hp/home" element={<HpHome />} />
        <Route path="/hp/profile" element={<HPProfilePage />} />
        <Route path="/hp/forgot-password" element={<HPForgotPassword />} />
        <Route path="/hp/tutorials" element={<UploadVideo />} />
        <Route path="/hp/full-screen/:id" element={<WatchTutorialFullScreen />} />
        <Route path="/hp/blog/:id" element={<FullBlog />} />
        <Route path="/hp/create-blog" element={<HPCreateBlog />} />

        {/* vaccination center routes  */}
        <Route path="/vc/home" element={<VCHome />} />
        <Route path="/vc/signup" element={<VCSignup />} />
        <Route path="/vc/login" element={<VCLogin />} />
        <Route path="/vc/profile" element={<VCProfilePage />} />
        <Route path="/vc/chat" element={<ChatWithParent />} />
        <Route path="/vc/forgot-password" element={<VCForgotPassword />} />
        <Route path="/vc/add-vaccines" element={<AddVaccines />} />

        {/* Asha Worker routes */}
        <Route path="/aw/signup" element={<AWSignup />} />
        <Route path="/aw/login" element={<AWLogin />} />
        <Route path="/aw/home" element={<AWHome />} />
        <Route path="/aw/forgot-password" element={<AWForgotPassword />} />
        <Route path="/aw/profile" element={<AWProfilePage />} />

        {/* common pages  */}
        <Route path="/footer" element={<CommonFooter />} />
        {/* admin routes */}

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectAdminRoutes>
              <AdminDashboard />
            </ProtectAdminRoutes>
          }
        />

        {/* testing routes  */}

        <Route path="/*" element={<h1> 404 Please check your URL</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
