import {ParentNavbar} from "./Components/parentNavbar";
import Carousel1 from "./Components/Carousel1";
import Goals from "./Components/Goals";
import Freev from "./Components/Freev";
import Freeb from "./Components/Freeb";
import { CommonFooter } from "../../components/common/footer/footer";

export const CommonHomePage = () => {
  return (
    <div>
      <ParentNavbar/>
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
