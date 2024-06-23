import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
import { VCDetailsContainer } from "../../../components/parent/vcDetailsContainer/vcDetailsContainer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSingleObjectData } from "../../../hooks/useGetSingleObjectData";
import { ErrorHandlingUI } from "../../../components/common/errorHandlingUI/errorHandlingUi";
import { isVaccinationCenterData } from "../../../types/typeGuard";
export const ViewVCDeatils = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useGetSingleObjectData(
    `/getVCDataById/${id}`
  );
  const navigate = useNavigate();
  console.log("data", isLoading, data, error);
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
          <ErrorHandlingUI />
        )}
      </div>
      <CommonFooter />
    </div>
  );
};
