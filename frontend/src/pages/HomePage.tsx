import { useDispatch, useSelector } from "react-redux";
import { PageContainer } from "../common/layouts/PageContainer"
import { logout, selectUser } from "../common/Redux/Slices/userSlice";
import { callPost } from "../common/Fetch";
import { apiRoutes } from "../common/ApiRoutes";
import { useNavigate } from "react-router-dom";


export const HomePage = (props: any) => {
    
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = async () => {
        if (user){
            setAjax(true)
            await callPost(apiRoutes.user + '/' + user.email + '/logout', null, user.accessToken, false)
            setAjax(false)
            dispatch(logout())
            navigate('/');
        }
    }

    return <PageContainer title={`Strona główna`}>
        Strona główna
        <button onClick={handleClick}>Wyloguj legancko</button>
    </PageContainer>
}

function setAjax(arg0: boolean) {
    throw new Error("Function not implemented.");
}
