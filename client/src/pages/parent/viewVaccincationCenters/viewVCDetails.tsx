import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
import { VCDetailsContainer } from "../../../components/parent/vcDetailsContainer/vcDetailsContainer";
import { useFetchData } from "../../../hooks/useFetchData";
import {useParams} from 'react-router-dom';
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
export const ViewVCDeatils = () => {

    const {id} = useParams();
    const {isLoading, error, data} = useFetchData(`/getHPDataById/${id}`);
    console.log("data", isLoading, data, error);
    useEffect(() => {
        if (id) {
            
        }else {
            
        }
    }, [id])


    return (
    <div>
      <ParentNavbar />
      <div style={{ minHeight: "600px" }}>
        <VCDetailsContainer />
      </div>
      <CommonFooter />
    </div>
  );
};
