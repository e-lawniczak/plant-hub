import { useDispatch, useSelector } from "react-redux";
import { PageContainer } from "../../common/layouts/PageContainer";
import { logout, selectUser } from "../../common/Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { callDelete } from "../../common/Fetch";
import { AjaxLoader } from "../../common/AjaxLoader"
import { apiRoutes } from "../../common/ApiRoutes";
import { useState } from "react";
import { Button } from "carbon-components-react";

export const ProfilPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isAjax, setAjax] = useState(false);

    const user = useSelector(selectUser)

    const modifyUser = () => {
        navigate('/profile/modify', { replace: false })
    }

    const deleteUser = async () => {
        setAjax(true)
        let res = await callDelete(apiRoutes.user + '/' + user.email, true)

        setAjax(false)

        if (res.status === 401) {
            dispatch(logout())
            navigate('/login', { replace: true })
        } else {
            dispatch(logout())
            navigate('/', { replace: true })
        }
    }

    return <PageContainer title="Mój profil">
        {user != null && <section className="profile-page">
            <h1>Email: {user.email}</h1>
            <h1>Name: {user.firstName} {user.lastName}</h1>
            <h1>Phone: {user.phone}</h1>
            <p>City: {user.city}</p>
            <p>Votes: {user.votes}</p>
            <AjaxLoader isAjax={isAjax}>
                <div className="profile-buttons">
                    <Button onClick={modifyUser}>Modify</Button>
                    <Button onClick={deleteUser}>Delete</Button>
                </div>
            </AjaxLoader>
        </section>}
    </PageContainer>
}

