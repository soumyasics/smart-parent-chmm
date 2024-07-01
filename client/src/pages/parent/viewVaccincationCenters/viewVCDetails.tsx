import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
import { VCDetailsContainer } from "../../../components/parent/vcDetailsContainer/vcDetailsContainer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSingleObjectData } from "../../../hooks/useGetSingleObjectData";
import { isVaccinationCenterData } from "../../../types/typeGuard";
import { PageLoading2 } from "../../../components/pageLoading/pageLoading2";
export const ViewVCDeatils = () => {
  const { id } = useParams();
  const {  data } = useGetSingleObjectData(
    `/getVCDataById/${id}`
  );
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) {
      navigate("/parent/view-vc");
    }
  }, [id]);

  return (
    <div>
      <ParentNavbar />
      <div style={{ minHeight: "600px" }}>
        {data && isVaccinationCenterData(data) ? (
          <VCDetailsContainer data={data} />
        ) : (
          <PageLoading2 />
        )}
      </div>
      <CommonFooter />
    </div>
  );
};
