import { CommonFooter } from "../../../components/common/footer/footer";
import { HomeCarousel } from "../../../components/common/carousel/carousel";
import FeaturedHealthTips from "../../../components/featuredHealthTips/featuredHealthTips";
import ProfessionalTestimonials from "../../../components/professionalTestimonials/professionalTestimonials";
import LatestArticles from "../../../components/latestArticles/latestArticles";
import { VCNavbar } from "../../../components/vc/vcNavbar/vcNavbar";
export const VCHome = () => {
  return (
    <div>
      <VCNavbar />
      <HomeCarousel />
      <FeaturedHealthTips />
      <ProfessionalTestimonials />
      <LatestArticles />
      <CommonFooter />
    </div>
  );
};
