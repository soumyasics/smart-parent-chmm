import Carousel1 from "./Components/Carousel1";
import Goals from "./Components/Goals";
import Freev from "./Components/Freev";
import { CommonFooter } from "../../components/common/footer/footer";
import { LandingPageNavbar } from "../../components/landingPage/landingPageNavbar/landingPageNavbar";

export const CommonHomePage = () => {
  return (
    <div>
      <LandingPageNavbar />
      <Carousel1 />
      <Goals />
      <Freev />
      <div className="mt-5">
        <CommonFooter />
      </div>
    </div>
  );
};
