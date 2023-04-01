import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from "react-hook-form";
import { AjaxLoader } from "../../common/AjaxLoader"
import { apiRoutes } from "../../common/ApiRoutes";
import { callPost } from "../../common/Fetch";
import { PageContainer } from "../../common/layouts/PageContainer"
import { IRegisterInputs } from "../../common/models";

export const RegisterPage = () =>{
    const navigate = useNavigate();
    const [isAjax, setAjax] = useState(false);
    const {register, handleSubmit} = useForm<IRegisterInputs>();

    const onSubmit: SubmitHandler<IRegisterInputs> = async (data) => {
        setAjax(true)
        let req = await callPost(apiRoutes.register, data)
        setAjax(false)

        navigate(apiRoutes.main);
    }

            
    return <PageContainer>
        <h1>Register</h1>
        <AjaxLoader isAjax={isAjax}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Email" {...register("email")}/>
                <input placeholder="Password" type="password" {...register("password")}/>
                <input placeholder="First name" {...register("firstName")}/>
                <input placeholder="Last name" {...register("lastName")}/>
                <input placeholder="Phone" {...register("phone")}/>
                <input placeholder="City" {...register("city")}/>
                <input type="submit" value="Register"/>
            </form>
        </AjaxLoader>
    </PageContainer>
}

