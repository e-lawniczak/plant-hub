import { useDispatch, useSelector } from "react-redux";
import { PageContainer } from "../../common/layouts/PageContainer";
import { logout, selectUser } from "../../common/Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { callDelete} from "../../common/Fetch";
import { AjaxLoader } from "../../common/AjaxLoader"
import { apiRoutes } from "../../common/ApiRoutes";
import { useState } from "react";

export const ProfilPage = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isAjax, setAjax] = useState(false);

    const user = useSelector(selectUser)

    const modifyUser =  () => {

    }

    const deleteUser = async () => {
        setAjax(true)
        let res = await callDelete(apiRoutes.user + '/' + user.email, null, user.accessToken)

        setAjax(false)

        if(res.status === 401) {
            dispatch(logout())
            navigate('/login', { replace: true })
        }else {
            dispatch(logout())
            navigate('/', { replace: true })
        }
    }

    return <PageContainer title="Mój profil">
        <h1>Email: {user.email}</h1>
        <h2>Name: {user.firstName} {user.lastName}</h2>
        <h2>Phone: {user.phone}</h2>
        <p>City: {user.city}</p>
        <p>Votes: {user.votes}</p>
        <AjaxLoader isAjax={isAjax}>
            <button onClick={modifyUser}>Modify</button>
            <button onClick={deleteUser}>Delete</button>
        </AjaxLoader>
    </PageContainer>
}

