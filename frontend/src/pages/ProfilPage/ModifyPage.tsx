import { useState } from "react";
import { AjaxLoader } from "../../common/AjaxLoader"
import { PageContainer } from "../../common/layouts/PageContainer"
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../common/Redux/Slices/userSlice";
import { apiRoutes } from "../../common/ApiRoutes";
import { callPut } from "../../common/Fetch";
import { useNavigate } from "react-router-dom";
import { IModifyInputs} from "../../common/models";
import { SubmitHandler, useForm } from "react-hook-form";

export const ModifyPage = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isAjax, setAjax] = useState(false);
    const {register, handleSubmit} = useForm<IModifyInputs>(
        {
            defaultValues: {
              firstName: user.firstName,
              lastName: user.lastName,
              phone: user.phone,
              city: user.city
            }
          }
    );

    const onSubmit: SubmitHandler<IModifyInputs> = async (data) => {
        setAjax(true)
        let res = await callPut(apiRoutes.user + '/' + user.email, data, user.accessToken)

        setAjax(false)
        if(res.status === 200) {
            let userToken = {accessToken: user.accessToken, tokenType: user.tokenType}
            let resUser = Object.assign({}, res.body, userToken);

            dispatch(login(resUser))

            navigate('/profile');

        }
        if(res.status === 401) {
            dispatch(logout())
            navigate('/login', { replace: true })
        }
    }

    

    return <PageContainer title="Update information">
            <h1>Update</h1>
            <AjaxLoader isAjax={isAjax}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder="First name" {...register("firstName")}/>
                    <input placeholder="Last name" {...register("lastName")}/>
                    <input placeholder="Phone" {...register("phone")}/>
                    <input placeholder="City" {...register("city")}/>
                    <input type="submit" value="Update"/>
                </form>
            </AjaxLoader>
</PageContainer>
} 