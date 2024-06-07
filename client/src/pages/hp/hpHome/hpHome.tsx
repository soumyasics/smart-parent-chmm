import { HPNavbar } from "../../../components/hp/hpNavbar/hpNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
import { HomeCarousel } from "../../../components/common/carousel/carousel";
import FeaturedHealthTips from "../../../components/featuredHealthTips/featuredHealthTips";
import ProfessionalTestimonials from "../../../components/professionalTestimonials/professionalTestimonials";
import LatestArticles from "../../../components/latestArticles/latestArticles";
export const HpHome = () => {
  return (
    <div>
      <HPNavbar />
      <HomeCarousel />
      <FeaturedHealthTips />
      <ProfessionalTestimonials />
      <LatestArticles />
      <CommonFooter />
    </div>
  );
};
