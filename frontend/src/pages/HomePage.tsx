import { useDispatch} from "react-redux";
import { PageContainer } from "../common/layouts/PageContainer"
import { logout } from "../common/Redux/Slices/userSlice";


export const HomePage = ()=>{
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(logout())
    }

    return <PageContainer title="Strona główna">
        Strona główna
        <button onClick={handleClick}>Wyloguj legancko</button>
    </PageContainer>
}