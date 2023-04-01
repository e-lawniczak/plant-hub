import { useSelector } from "react-redux";
import { PageContainer } from "../../common/layouts/PageContainer";
import { selectUser } from "../../common/Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { callDelete, callPatch, callPost, callPut } from "../../common/Fetch";
import { AjaxLoader } from "../../common/AjaxLoader"
import { apiRoutes } from "../../common/ApiRoutes";
import { useState } from "react";

export const ProfilPage = ()=>{

    const [isAjax, setAjax] = useState(false);

    const navigate = useNavigate();
    const user = useSelector(selectUser)

    console.log(user.user);
    const modifyUser =  async () => {
        setAjax(true)
        let res = await callPut(apiRoutes.getUser + '/' + user.email, null, user.accessToken)

        setAjax(false)

        console.log(res);
    }

    const deleteUser = async () => {

    }

    return <PageContainer title="Mój profil">
        <h1>Email: {user.email}</h1>
        <h2>Name: {user.firstName} {user.lastName}</h2>
        <h2>Phone: {user.phone}</h2>
        <p>City: {user.city}</p>
        <p>Votes: {user.votes}</p>
        <button onClick={modifyUser}>Modify</button>
        <button onClick={deleteUser}>Delete</button>
    </PageContainer>
}

