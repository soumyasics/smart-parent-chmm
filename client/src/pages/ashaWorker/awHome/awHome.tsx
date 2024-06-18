import { CommonFooter } from "../../../components/common/footer/footer";
import { HomeCarousel } from "../../../components/common/carousel/carousel";
import FeaturedHealthTips from "../../../components/featuredHealthTips/featuredHealthTips";
import ProfessionalTestimonials from "../../../components/professionalTestimonials/professionalTestimonials";
import LatestArticles from "../../../components/latestArticles/latestArticles";
import { AWNavbar } from "../../../components/aw/awNavbar/awNavbar";
export const AWHome = () => {
  return (
    <div>
      <AWNavbar />
      <HomeCarousel />
      <FeaturedHealthTips />
      <ProfessionalTestimonials />
      <LatestArticles />
      <CommonFooter />
    </div>
  );
};
