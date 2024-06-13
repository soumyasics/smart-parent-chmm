import {useNavigate} from 'react-router-dom';
export const useCustomNavigate = () => {
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);
    }
    return handleNavigation
}