import { Container } from "react-bootstrap";
import { CommonFooter } from "../../../components/common/footer/footer";
import { VCSignupForm } from "./vcSignupForm";
import { useNavigate } from "react-router-dom";
import { VCNavbar } from "../../../components/vc/vcNavbar/vcNavbar";

export const VCSignup = () => {
  const navigate = useNavigate();
  const navigateVCLogin = () => {
    navigate("/vc/login");
  };
  return (
    <>
      <VCNavbar />
      <div className="mt-5" id="user-signup-page">
        <Container className="user-signup-container">
          <div className="user-signup-form">
            <div className="user-signup-form-heading">
              {" "}
              <h3 className="text-center">
                Register as Vaccination Center
              </h3>{" "}
            </div>

            <div className="user-signup-input-container">
              <div className="users-signup-form-components p-3 shadow">
                <VCSignupForm />
              </div>
            </div>
          </div>
          <p className="ms-3 mt-5">
            Already have an account?{" "}
            <span
              className="font-weight-bold user-forgot-password text-primary"
              onClick={navigateVCLogin}
              style={{ cursor: "pointer" }}
            >
              {" "}
              Sign In{" "}
            </span>
          </p>
        </Container>

        <div className="mt-5">
          <CommonFooter />
        </div>
      </div>
    </>
  );
};
