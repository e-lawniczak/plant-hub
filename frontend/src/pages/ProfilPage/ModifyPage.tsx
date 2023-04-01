import { useState } from "react";
import { AjaxLoader } from "../../common/AjaxLoader"
import { PageContainer } from "../../common/layouts/PageContainer"
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../common/Redux/Slices/userSlice";
import { apiRoutes } from "../../common/ApiRoutes";
import { callPut } from "../../common/Fetch";
import { useNavigate } from "react-router-dom";

export const ModifyPage = () => {

    
    const [isAjax, setAjax] = useState(false);
    const navigate = useNavigate();

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const modifyUser = async () => {
        setAjax(true)
        let res = await callPut(apiRoutes.user + '/' + user.email, null, user.accessToken)

        setAjax(false)
        
        if(res.status === 401) {
            dispatch(logout())
            navigate('/login', { replace: true })
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
    </AjaxLoader>
</PageContainer>
} 