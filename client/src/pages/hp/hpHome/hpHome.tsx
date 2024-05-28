import { HPNavbar } from "../../../components/hp/hpNavbar/hpNavbar"
import { CommonFooter } from "../../../components/common/footer/footer"
import { HomeCarousel } from "../../../components/common/carousel/carousel"
export const HpHome = () => {
    return (
        <div>
            <HPNavbar />
            <div className="mt-5" style={{minHeight: "800px"}}>
            <HomeCarousel />

            </div>

            <CommonFooter />
            
        </div>
    )
}