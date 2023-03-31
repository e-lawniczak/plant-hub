import { useSelector } from "react-redux";
import { PageContainer } from "../../common/layouts/PageContainer";
import { selectUser } from "../../common/Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "../../common/ApiRoutes";

export const ProfilPage = ()=>{
    const navigate = useNavigate();
    const select = useSelector(selectUser)

    const modifyUser =  () => {
        navigate(apiRoutes.register, {state: select});
    }

    const deleteUser = async () => {

    }

    return <PageContainer title="Mój profil">
        <h1>Email: {select.email}</h1>
        <h2>Name: {select.firstName} {select.lastName}</h2>
        <h2>Phone: {select.phone}</h2>
        <p>City: {select.city}</p>
        <p>Votes: {select.votes}</p>
        <button onClick={modifyUser}>Modify</button>
        <button onClick={deleteUser}>Delete</button>
    </PageContainer>
}