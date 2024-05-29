import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { HomeCarousel } from "../../../components/common/carousel/carousel";
import FeaturedHealthTips from "../../../components/featuredHealthTips/featuredHealthTips";
import ProfessionalTestimonials from "../../../components/professionalTestimonials/professionalTestimonials";
import LatestArticles from "../../../components/latestArticles/latestArticles";
export const ParentHome = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { user } = useSelector((state: RootState) => state);

  console.log("is aut", isAuthenticated);
  console.log("user", user);
  return (
    <div>
      <ParentNavbar />
      <HomeCarousel />
      <FeaturedHealthTips />
      <ProfessionalTestimonials />
      <LatestArticles />
     
      <CommonFooter />
    </div>
  );
};
