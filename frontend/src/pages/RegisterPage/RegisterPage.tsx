import { useState } from "react";
import { Form, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from "react-hook-form";
import { AjaxLoader } from "../../common/AjaxLoader"
import { apiRoutes } from "../../common/ApiRoutes";
import { callPost } from "../../common/Fetch";
import { PageContainer } from "../../common/layouts/PageContainer"
import { IRegisterInputs } from "../../common/models";
import { Button, TextInput } from "carbon-components-react";

export const RegisterPage = () =>{
    const navigate = useNavigate();
    const [isAjax, setAjax] = useState(false);
    const {register, handleSubmit} = useForm<IRegisterInputs>();

    const onSubmit: SubmitHandler<IRegisterInputs> = async (data) => {
        setAjax(true)
        await callPost(apiRoutes.register, data, false)
        setAjax(false)

        navigate('/');
    }

            
    return <PageContainer>
        <h1>Register</h1>
        <AjaxLoader isAjax={isAjax}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInput id={"email"} labelText={"Email"} placeholder="Email" {...register("email")}/>
                <TextInput id={"password"} labelText={"Password"}  placeholder="Password" type="password" {...register("password")}/>
                <TextInput id={"firstName"} labelText={"First Name"}  placeholder="First name" {...register("firstName")}/>
                <TextInput id={"lastName"} labelText={"Last Name"} placeholder="Last name" {...register("lastName")}/>
                <TextInput id={"phone"} labelText={"Phone"} placeholder="Phone" {...register("phone")}/>
                <TextInput id={"city"} labelText={"City"} placeholder="City" {...register("city")}/>
                <Button className="custom-button" type="submit" value="Register">Register</Button>
            </Form>
        </AjaxLoader>
    </PageContainer>
}

