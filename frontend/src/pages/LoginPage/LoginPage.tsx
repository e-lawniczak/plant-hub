import { useNavigate } from "react-router-dom";
import { AjaxLoader } from "../../common/AjaxLoader"
import { PageContainer } from "../../common/layouts/PageContainer"
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { apiRoutes } from "../../common/ApiRoutes";
import { callGet, callPost } from "../../common/Fetch";
import { ILoginInputs} from "../../common/models";
import { login } from "../../common/Redux/Slices/userSlice";
import { useDispatch } from "react-redux";

export const LoginPage = () =>{

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [isAjax, setAjax] = useState(false);
    const {register, handleSubmit} = useForm<ILoginInputs>();

    const onSubmit: SubmitHandler<ILoginInputs> = async (data: any) => {
        setAjax(true)
        let res = await callPost(apiRoutes.login, data)

        if(res.status !== 401){
            let user = await callGet(apiRoutes.user + '/' + data.email)

            let resUser = Object.assign({}, user.body, res.body);

            dispatch(login(resUser))
        }
        setAjax(false)
        navigate('/');

    }

    return <PageContainer>
        <h1>Login</h1>
        <AjaxLoader isAjax={isAjax}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Email" {...register("email")}/>
                <input placeholder="Password" type="password" {...register("password")}/>
                <input type="submit" value="Login"/>
            </form>
        </AjaxLoader>
    </PageContainer>
}
