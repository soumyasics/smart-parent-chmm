import { CommonFooter } from "../../../components/common/footer/footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSingleObjectData } from "../../../hooks/useGetSingleObjectData";
import { isVaccinationCenterData } from "../../../types/typeGuard";
import { PageLoading2 } from "../../../components/pageLoading/pageLoading2";
import { AWNavbar } from "../../../components/aw/awNavbar/awNavbar";
import { AWVCDetailsContainer } from "../../../components/parent/vcDetailsContainer/awvcDetailsContainer";
export const AWViewVCDeatils = () => {
  const { id } = useParams();
  const { data } = useGetSingleObjectData(`/getVCDataById/${id}`);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/aw/view-vc");
    }
  }, [id]);

  return (
    <div>
      <AWNavbar />
      <div style={{ minHeight: "600px" }}>
        {data && isVaccinationCenterData(data) ? (
          <AWVCDetailsContainer data={data} />
        ) : (
          <PageLoading2 />
        )}
      </div>
      <div className="mt-5">
        <CommonFooter />
      </div>
    </div>
  );
};
