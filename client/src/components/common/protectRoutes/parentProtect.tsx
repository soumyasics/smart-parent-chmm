import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store";
const ParentProtect = () => {
    const {isAuthenticated, usertype} = useSelector((state: RootState) => state.user);
    return (
        <div>
            {/* {isAu } */}
        </div>
    )
}