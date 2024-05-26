import Carousel1 from "./Components/Carousel1";
import Goals from "./Components/Goals";
import Freev from "./Components/Freev";
import Freeb from "./Components/Freeb";
import { CommonFooter } from "../../components/common/footer/footer";
import { LandingPageNavbar } from "../../components/landingPage/landingPageNavbar/landingPageNavbar";

export const CommonHomePage = () => {
  return (
    <div>
      <LandingPageNavbar />
      <Carousel1 />
      <Goals />
      <Freev />
      <Freeb />
      <div className="mt-5">
        <CommonFooter />
      </div>
    </div>
  );
};
