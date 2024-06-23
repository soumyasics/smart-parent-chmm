import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSingleObjectData } from "../../../hooks/useGetSingleObjectData";
import { ErrorHandlingUI } from "../../../components/common/errorHandlingUI/errorHandlingUi";
import { isHealthProfessionalData } from "../../../types/typeGuard";
import { HPDetailsContainer } from "../../../components/parent/hpDetailsContainer/hpDetailsContainer";
export const ViewHPDeatils = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useGetSingleObjectData(
    `/getHPDataById/${id}`
  );
  const navigate = useNavigate();
  console.log("data", isLoading, data, error);
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
          <HPDetailsContainer data={data} />
        ) : (
          <ErrorHandlingUI />
        )}
      </div>
      <CommonFooter />
    </div>
  );
};
