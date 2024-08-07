import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSingleObjectData } from "../../../hooks/useGetSingleObjectData";
import { isHealthProfessionalData } from "../../../types/typeGuard";
import { PageLoading2 } from "../../../components/pageLoading/pageLoading2";
import { FitnessHPDetailsContainer } from "../../../components/parent/hpDetailsContainer/hpFitnessDetailsContainer";
export const ViewFitnessHPDeatils = () => {
  const { id } = useParams();
  const { data } = useGetSingleObjectData(`/getHPDataById/${id}`);
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/parent/view-hp");
    }
  }, [id]);

  return (
    <div>
      <ParentNavbar />
      <div style={{ minHeight: "600px" }}>
        {data && isHealthProfessionalData(data) ? (
          <FitnessHPDetailsContainer data={data} />
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
