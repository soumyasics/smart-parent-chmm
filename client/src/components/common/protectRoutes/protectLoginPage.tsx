import {useSelector} from 'react-redux';
import { RootState } from '../../../redux/store';
import { Navigate } from 'react-router-dom';

export const ProtectLoginPage = ({children}: {children: JSX.Element}) => {
    const {isAuthenticated} = useSelector((state:RootState) => state.user);
    return isAuthenticated ? <Navigate to="/parent/home" />: children;
}