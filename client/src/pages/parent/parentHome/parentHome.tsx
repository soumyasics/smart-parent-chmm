import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { CommonFooter } from "../../../components/common/footer/footer";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
export const ParentHome = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { user } = useSelector((state: RootState) => state);

  console.log("is aut", isAuthenticated);
  console.log("user", user);
  return (
    <div>
      <ParentNavbar />
      <div style={{ minHeight: "500px" }}>
        <h1> Parent Home </h1>
      </div>
      <CommonFooter />
    </div>
  );
};
