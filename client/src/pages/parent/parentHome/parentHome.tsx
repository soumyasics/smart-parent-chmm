import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
import { HomeCarousel } from "../../../components/common/carousel/carousel";
import FeaturedHealthTips from "../../../components/featuredHealthTips/featuredHealthTips";
import ProfessionalTestimonials from "../../../components/professionalTestimonials/professionalTestimonials";
import LatestArticles from "../../../components/latestArticles/latestArticles";
export const ParentHome = () => {
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
